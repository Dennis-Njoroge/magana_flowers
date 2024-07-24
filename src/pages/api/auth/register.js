import {API_METHODS} from "@/utils/api-endpoints";
import {createUserHandler} from "@/controllers/UserController";


export default async function handler(req, res) {
    switch (req.method) {
        case API_METHODS.POST:
            await createUserHandler(req, res);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}



