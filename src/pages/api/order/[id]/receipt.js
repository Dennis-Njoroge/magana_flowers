import {generateReceiptHandler} from "@/controllers/OrderController";

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await generateReceiptHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
