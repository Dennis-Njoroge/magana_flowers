import { Op } from 'sequelize';
import {createProductHandler, getAllProductsHandler, searchProductsHandler} from "@/controllers/ProductController";
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb' // Set desired value here
        }
    }
}
export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            if (req.query.q || req.query.categoryId) {
                await searchProductsHandler(req, res);
            } else {
                await getAllProductsHandler(req, res);
            }
            break;
        case 'POST':
            await createProductHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
