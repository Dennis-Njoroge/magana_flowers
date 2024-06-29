import {API_METHODS, API_URL} from "@/utils/api-endpoints";
import {decryptData} from "@/utils/encrypt-decrypt";
import {backendAxiosInstance} from "@/services/axios-instance";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '50mb' // Set desired value here
        }
    }
}
export default async function handler(req, res) {
    if (req.method === API_METHODS.POST) {

        const config = {
            headers: {
                'Authorization': req.headers.authorization,
            }
        };
        const body = req.body;
        if (body?.data !== undefined) {
            try {

                const formData = decryptData(body.data);
                await backendAxiosInstance.post(`${API_URL.UPLOAD_CLAIMS}`, formData, config).then(response => {
                    res.status(response.status).json(response.data);
                }).catch(e => res.status(e?.response?.status ?? 500).json(e.response?.data))

            } catch (e) {
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).json({message: 'No body found!'})
        }
    } else {
        res.status(404).json({message: 'path not found!'});
    }
}




