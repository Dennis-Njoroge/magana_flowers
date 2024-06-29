import {deleteCategoryHandler, getCategoryByIdHandler, updateCategoryHandler} from "@/controllers/CategoryController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getCategoryByIdHandler(req, res);
            break;
        case 'PUT':
            await updateCategoryHandler(req, res);
            break;
        case 'DELETE':
            await deleteCategoryHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
