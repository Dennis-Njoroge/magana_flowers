import {createUser, getAllUsersHandler} from "@/controllers/UserController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getAllUsersHandler(req, res);
            break;
        case 'POST':
            await createUser(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
