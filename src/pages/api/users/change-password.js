import {changeResetPasswordHandler} from "@/controllers/UserController";

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await changeResetPasswordHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
