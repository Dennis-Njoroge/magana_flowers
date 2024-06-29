import {deleteProductHandler, getProductByIdHandler, updateProductHandler} from "@/controllers/ProductController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getProductByIdHandler(req, res);
            break;
        case 'PUT':
            await updateProductHandler(req, res);
            break;
        case 'DELETE':
            await deleteProductHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
