import {generateReceiptHandler, updateOrderStatusHandler} from "@/controllers/OrderController";

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await generateReceiptHandler(req, res);
            break;
        case 'PUT':
            await updateOrderStatusHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET','POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
