import {createPickUpPointHandler, getAllPickUpPointsHandler} from "@/controllers/PickUpPointController";


export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getAllPickUpPointsHandler(req, res);
            break;
        case 'POST':
            await createPickUpPointHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
