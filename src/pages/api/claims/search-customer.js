import {API_METHODS, API_URL} from "@/utils/api-endpoints";
import {decryptData} from "@/utils/encrypt-decrypt";
import {backendAxiosInstance} from "@/services/axios-instance";


export default async function handler(req, res) {
    if (req.method === API_METHODS.POST) {
        const body = req.body;
        if (body?.data !== undefined) {
            try {
                const config = {
                    headers: {
                        'Authorization': req.headers.authorization,
                    }
                };
                const formData = decryptData(body.data);
                await backendAxiosInstance.post(`${API_URL.SEARCH_CUSTOMER}/${formData?.query}`, formData, config).then(response => {
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




