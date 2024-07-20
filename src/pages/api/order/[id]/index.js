import {updateOrderStatusHandler} from "@/controllers/OrderController";

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            await updateOrderStatusHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
