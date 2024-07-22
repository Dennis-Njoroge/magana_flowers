import * as orderRepository from '@/repositories/OrderRepository';
import {generateReceipt} from "@/repositories/OrderRepository";


export const createOrderHandler = async (req, res) => {
    try {
        const order = await orderRepository.createOrder(req.body);
        if (!order){
            res.status(400).json({ error: "Invalid request"});
            return;
        }
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllOrdersHandler = async (req, res) => {
    try {
        const orders = await orderRepository.getOrders(req?.query);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateOrderStatusHandler = async (req, res) => {
    try {
        const order = await orderRepository.updateOrderStatus(req.query.id, req.body, req.query.driver_id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const generateReceiptHandler = async (req, res) => {
    try{
        return await generateReceipt(req, res);
        // if (receipt){
        //     res.status(200).json(receipt);
        // }
        // else{
        //     res.status(404).json({ error: 'Order not found' });
        // }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// export const deleteCartHandler = async (req, res) => {
//     try {
//         const success = await orderRepository.deleteCart(req.query.id, null);
//         if (success) {
//             res.status(204).end();
//         } else {
//             res.status(404).json({ error: 'Cart not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
//
// export const deleteCartByUserIdHandler = async (req, res) => {
//     try {
//         const success = await orderRepository.deleteCart(null, req.query?.userId);
//         if (success) {
//             res.status(204).end();
//         } else {
//             res.status(404).json({ error: 'No Items found' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



