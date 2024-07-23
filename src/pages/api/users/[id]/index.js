import {
    approveUserHandler,
    getUserHandler,
    updateUserHandler
} from "@/controllers/UserController";

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            await getUserHandler(req, res);
            break;
        case 'POST':
            await approveUserHandler(req, res);
            break;
        case 'PUT':
            await updateUserHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
