import {createCategoryHandler, getAllCategoriesHandler} from "@/controllers/CategoryController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getAllCategoriesHandler(req, res);
            break;
        case 'POST':
            await createCategoryHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
