import models from "@/models/order-associations";
import User from "@/models/User";
import Product from "@/models/Product";
import  {Op} from "sequelize";
import { generateOrderNumber} from "@/utils/helper-functions";
import sequelize from '@/config/database';
import {ORDER_STATUS} from "@/utils/constants";
import {deleteCart} from "@/repositories/CartRepository";
import * as path from "path";
import PDFDocument from "pdfkit";
import * as fs from "fs";
import {createReceipt} from "@/utils/receipt-template";
import {storage} from "@/lib/firebaseAdmin";

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

        if (data?.status === ORDER_STATUS.APPROVED){
            await deductProductQuantity(order.id)
        }

        if (driverId || data?.status === ORDER_STATUS.DELIVERED){
            await assignDriver(id, driverId, data?.status === ORDER_STATUS.DELIVERED );
        }
        const updatedOrder = await order.update(data);
        return { success: true, message: "Order Updated Successfully"  , action: 'updated', order: updatedOrder }
    }
    return null;
};


 const deductProductQuantity = async (orderId) => {
    const transaction = await sequelize.transaction();

    try {
        const orderDetails = await OrderDetails.findAll({
            where: { order_id: orderId },
            transaction
        });

        if (orderDetails) {
            await Promise.all(orderDetails.map(async (detail) => {
                const product = await Product.findByPk(detail.prod_id, { transaction });

                if (product) {
                    product.qty -= detail.qty;
                    await product.save({ transaction });
                }
            }));
        }

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error; // Rethrow the error after rolling back the transaction
    }
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


// export const generateReceipt = async (req, res) => {
//     const order = await fetchOrderDetails(req?.query?.id);
//     if (!order) {
//         throw new Error('Order not found');
//     }
//
//     // Create a document
//     const doc = new PDFDocument({ size: "A4", margin: 50 });
//
//     // Pipe the document to a blob
//     const fileName = `receipt-${order.id}.pdf`;
//     const filePath = path.join(process.cwd(), 'public', 'receipts', fileName);
//     doc.pipe(fs.createWriteStream(filePath));
//
//     const logoPath = path.join(process.cwd(), 'public/static', 'logo.png');
//
//     //creates a receipt
//     createReceipt(doc, logoPath, order)
//
//     // Finalize the PDF and end the stream
//     await doc.end();
//
//     const origin = req.headers.origin || process.env.NEXT_PUBLIC_BASE_URL;
//     await doc.on('end', () => {
//         res.status(200).json({success: true, fileUrl: `${origin}/receipts/${fileName}`, fileName });
//     });
//
// };

export const generateReceipt = async (req, res) => {

    const order = await fetchOrderDetails(req?.query?.id);
    if (!order) {
        throw new Error("Order not found");
    }

    // Create a PDF document
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const fileName = `receipt-${order.id}.pdf`;
    const tempFilePath = path.join(process.cwd(), "public", "receipts", fileName);

    // Create the PDF and write to a temporary file
    const writeStream = fs.createWriteStream(tempFilePath);
    doc.pipe(writeStream);

    const logoPath = path.join(process.cwd(), "public/static", "logo.png");

    // Create the receipt content
    createReceipt(doc, logoPath, order);

    // Finalize the PDF and upload to Firebase
    doc.end();

    // Upload to Firebase Storage after PDF generation
    writeStream.on("finish", async () => {
        const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
        const destination = `receipts/${fileName}`;
        await bucket.upload(tempFilePath, {
            destination: destination,
            contentType: "application/pdf",
        });

        // Generate a signed URL for temporary access
        const [url] = await bucket.file(destination).getSignedUrl({
            action: "read",
            expires: "03-01-2030", // Set your expiration date here
        });

        // Clean up the temporary file
        fs.unlinkSync(tempFilePath);

        res.status(200).json({ success: true, fileUrl: url, fileName });
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





