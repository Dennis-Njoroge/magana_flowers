import {deletePickUpPointHandler, getPickUpPointByIdHandler, updatePickUpPointHandler} from "@/controllers/PickUpPointController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getPickUpPointByIdHandler(req, res);
            break;
        case 'PUT':
            await updatePickUpPointHandler(req, res);
            break;
        case 'DELETE':
            await deletePickUpPointHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
