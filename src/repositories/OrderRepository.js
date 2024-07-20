import models from "@/models/order-associations";
import User from "@/models/User";
import Product from "@/models/Product";
import  {Op} from "sequelize";
import {generateOrderNumber} from "@/utils/helper-functions";
import sequelize from '@/config/database';
import {ORDER_STATUS} from "@/utils/constants";
import {deleteCart} from "@/repositories/CartRepository";

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




