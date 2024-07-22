import models from "@/models/order-associations";
import User from "@/models/User";
import Product from "@/models/Product";
import  {Op} from "sequelize";
import {formatDate, generateOrderNumber} from "@/utils/helper-functions";
import sequelize from '@/config/database';
import {APP_NAME, ORDER_STATUS} from "@/utils/constants";
import {deleteCart} from "@/repositories/CartRepository";
import * as path from "path";
import PDFDocument from "pdfkit";
import * as fs from "fs";

const  {Order, OrderDetails, ShippingDetails} = models;


export const createOrder = async (orderData) => {
    const transaction = await sequelize.transaction();

    try {
        // Generate orders number
        const orderNo = generateOrderNumber();

        // Create orders
        const order = await Order.create({
            order_no: orderNo,
            user_id: orderData.user_id,
            shipping_charge: orderData.shipment_fee,
            total_amount: orderData.total_amount,
            order_date: new Date(),
            status: 'Pending',
        }, { transaction });

        // Create orders details
        const orderDetailsPromises = orderData.products.map(product => {
            return OrderDetails.create({
                order_id: order.id,
                prod_id: product.prod_id,
                qty: product.qty,
                price: product.price,
            }, { transaction });
        });

        await Promise.all(orderDetailsPromises);

        // Create shipping details
        await ShippingDetails.create({
            order_id: order.id,
            full_name: orderData.full_name,
            phone_no: orderData.phone_no,
            location: orderData.location,
           // driver_id: orderData.driver_id,
        }, { transaction });

        // Commit the transaction
        await transaction.commit();
        await deleteCart(null, orderData.user_id);
        return { success: true, message: 'Order created successfully!', data: order };
    } catch (error) {
        // Rollback the transaction
        await transaction.rollback();
        return { success: false, message: 'Order creation failed!', error: error.message };
    }
};

export const getOrders = async (filters) => {
    const whereConditions = {};
    const shippingWhereConditions = {};

    // Check for userId filter
    if (filters.user_id) {
        whereConditions.user_id = filters.user_id;
    }
    if (filters.payment_status) {
        whereConditions.payment_id = filters.payment_status.toLowerCase() !== 'paid' ? { [Op.is]: null } : { [Op.not]: null };
    }
    // Check for status filter
    if (filters.status) {
        whereConditions.status = filters.status;;
    }
    // Check for driverId filter in ShippingDetails
    if (filters.driver_id) {
        shippingWhereConditions.driver_id = filters.driver_id;
    }
    const orders = await Order.findAll({
        where: whereConditions,
        include: [
            {
                model: User,
                attributes: ['id','username'],
            },
            {
                model: OrderDetails,
                include: [
                    {
                        model: Product,
                        attributes: ['prod_id','prod_name', 'image'],
                    }
                ]
            },
            {
                model: ShippingDetails,
                attributes: ['id', 'order_id', 'full_name', 'phone_no', 'location', 'driver_id'],
                where: shippingWhereConditions,
                include: [
                    {
                        model: User,
                        attributes: ['id','username'],
                    }
                ]
            }
        ],
        order: [['id', 'desc']]
    });
    return { success: true, message: "Orders fetched successfully!"  ,  data: orders}

};

export const updateOrderStatus = async (id, data, driverId = null) => {
    const order = await Order.findByPk(id);
    if (order) {
        if (data?.status === ORDER_STATUS.CANCELED && order.status !== ORDER_STATUS.PENDING){
            throw new Error("Order is already approved!")
        }
        if (data?.status === ORDER_STATUS.DISPATCHED && !Boolean(driverId)){
            throw new Error("Driver ID is not assigned")
        }

        if (driverId || data?.status === ORDER_STATUS.DELIVERED){
            await assignDriver(id, driverId, data?.status === ORDER_STATUS.DELIVERED );
        }
        const updatedOrder = await order.update(data);
        return { success: true, message: "Order Updated Successfully"  , action: 'updated', order: updatedOrder }
    }
    return null;
};


const fetchOrderDetails = async (orderId) => {
    const order = await Order.findOne({
        where: { id: orderId },
        include: [
            {
                model: OrderDetails,
                include: [
                    {
                        model: Product,
                        attributes: ['prod_id', 'prod_name', 'image'],
                    }
                ]
            },
            {
                model: ShippingDetails,
                attributes: ['id', 'order_id', 'full_name', 'phone_no', 'location', 'driver_id'],
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email'],
                    }
                ]
            },
            {
                model: User,
                attributes: ['id', 'username', 'email'],
            }
        ],
    });

    return order;
};

// Helper function to generate receipt
export const generateReceipt = async (req, res) => {
    const order = await fetchOrderDetails(req?.query?.id);


    if (!order) {
        throw new Error('Order not found');
    }

    // Create a document
    const doc = new PDFDocument();

    // Set the response type
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=receipt-${order.id}.pdf`);

    // Pipe the document to a blob
    const fileName = `receipt-${order.id}.pdf`;
    const filePath = path.join(process.cwd(), 'public', 'receipts', fileName);
    doc.pipe(fs.createWriteStream(filePath));


    // Add logo to the PDF
    const logoPath = path.join(process.cwd(), 'public/static', 'logo.png');
    doc.image(logoPath, {
        fit: [100, 100],
        align: 'center',
        valign: 'center'
    });
    doc.moveDown(1);
    // Add content to the PDF
    doc.fontSize(20).text('Receipt', { align: 'center', fontWeight:'bold' });
    doc.moveDown(1);
    doc.fontSize(18).text(APP_NAME, { align: 'center' });
    doc.fontSize(14).text('magana@gmail.com', { align: 'center' });
    doc.fontSize(14).text('+254 712345678 | +25412536271', { align: 'center' });
    doc.moveDown();

    const orderDate = formatDate(order?.order_date, 'DD/MM/YYYY HH:mm a')
    // Define starting positions
    const pageWidth = doc.page.width;
    const margin = 10;
    const columnWidth = (pageWidth - 2 * margin) / 2; // Divide into 3 columns
    const startY = doc.y;

    // Add order details
    doc.fontSize(14).text(`Order No: ${order.order_no}`, margin, startY);
    doc.text(`Order Date: ${orderDate}`, margin + columnWidth, startY);
    doc.moveDown(1); // Move down for the next section

    // Add user details
    const userDetailsY = doc.y;
    doc.text(`Customer Name: ${order?.User?.username}`, margin, userDetailsY);
    doc.text(`Email: ${order?.User?.email}`, margin + columnWidth, userDetailsY);

    doc.moveDown(2); // Move down for the next section


    const tableData = order.OrderDetails.map(item => ({
        Product: item.Product.prod_name,
        Quantity: item.qty,
        Price: item.price.toFixed(2),
        Total: (item.qty * item.price).toFixed(2)
    }));
    // Draw order items table
    drawTable(doc, 50, doc.y, tableData);

    // Finalize the PDF and end the stream
    doc.end();
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;

    const origin = req.headers.origin || process.env.NEXT_PUBLIC_BASE_URL;

    return res.status(200).json({success: true, fileUrl: `${origin}/receipts/${fileName}`, fileName });
    //doc.pipe(res);
};

const drawTable = (doc, startX, startY, tableData) => {
    const cellPadding = 5;
    const tableWidth = doc.page.width - startX * 2;
    const cellWidth = [
        tableWidth * 0.5, // 50% width for Product
        tableWidth * 0.15, // 15% width for Quantity
        tableWidth * 0.15, // 15% width for Price
        tableWidth * 0.2 // 20% width for Total
    ];
    const cellHeight = 20;

    // Draw table header
    const headers = ['Product', 'Quantity', 'Price', 'Total'];
    headers.forEach((header, index) => {
        doc.rect(startX + cellWidth.slice(0, index).reduce((a, b) => a + b, 0), startY, cellWidth[index], cellHeight).stroke();
        doc.text(header, startX + cellWidth.slice(0, index).reduce((a, b) => a + b, 0) + cellPadding, startY + cellPadding);
    });

    // Draw table rows
    tableData.forEach((row, rowIndex) => {
        const yPosition = startY + (rowIndex + 1) * cellHeight;
        Object.values(row).forEach((value, colIndex) => {
            doc.rect(startX + cellWidth.slice(0, colIndex).reduce((a, b) => a + b, 0), yPosition, cellWidth[colIndex], cellHeight).stroke();
            doc.text(value, startX + cellWidth.slice(0, colIndex).reduce((a, b) => a + b, 0) + cellPadding, yPosition + cellPadding);
        });
    });
};




//functions

const assignDriver = async (orderId, driverId, delivered = false) => {
    const shipmentDetails = await ShippingDetails.findOne({
        where: {
            order_id: orderId
        }
    });
    if (!shipmentDetails){
        throw new Error("Shipment Details not found!");
    }
    let newData = {}
    if (driverId){
       newData.driver_id = driverId
    }
    if (delivered){
        newData.delivery_date = new Date();
    }
    await shipmentDetails.update(newData);
}





