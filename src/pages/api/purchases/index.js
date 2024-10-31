import {createPurchaseHandler, getAllPurchasesHandler} from "@/controllers/PurchasesController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getAllPurchasesHandler(req, res);
            break;
        case 'POST':
            await createPurchaseHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
