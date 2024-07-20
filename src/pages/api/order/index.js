import {createOrderHandler, getAllOrdersHandler} from "@/controllers/OrderController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getAllOrdersHandler(req, res);
            break;
        case 'POST':
            await createOrderHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
