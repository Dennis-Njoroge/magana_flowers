import {generateReceiptHandler, updatePurchaseStatusHandler} from "@/controllers/PurchasesController";

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await generateReceiptHandler(req, res);
            break;
        case 'PUT':
            await updatePurchaseStatusHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET','POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
