import {
    getCartQuantity,
} from "@/controllers/CartController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getCartQuantity(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
