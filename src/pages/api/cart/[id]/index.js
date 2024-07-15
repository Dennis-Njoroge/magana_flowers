import {deleteCartHandler, updateCartHandler} from "@/controllers/CartController";

export default async (req, res) => {
    switch (req.method) {
        case 'PUT':
            await updateCartHandler(req, res);
            break;
        case 'DELETE':
            await deleteCartHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
