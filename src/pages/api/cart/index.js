import {
    createCartHandler,
    deleteCartByUserIdHandler,
    getAllCartsHandler
} from "@/controllers/CartController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getAllCartsHandler(req, res);
            break;
        case 'POST':
            await createCartHandler(req, res);
            break;
        case 'DELETE':
            await deleteCartByUserIdHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
