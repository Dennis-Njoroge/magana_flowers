import axios from 'axios';
import dayjs from 'moment';
import {APP_API_URL} from "@/utils/api-endpoints";

const useAxios = useAuth => {
    const {user, logout, refreshToken} = useAuth;
    const axiosInstance = axios.create({
        headers: { Authorization: `bearer ${user?.accessToken}` },
    });

    axiosInstance.interceptors.request.use(async req => {
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
            return req;
        }
        //refresh auth token

        const config = {
            headers: {
                'Authorization': user.accessToken,
            }
        };

        const response = await axios.post(`${APP_API_URL.REFRESH_TOKEN}`, {
            token: user.accessToken,
            refreshToken: user.refreshToken,
        }, config);

        if (response.statusCode !== 200) {
            await logout();
            return;
        }
        const { data} = response;
        await refreshToken(data.token, data.refreshToken);
        req.headers.Authorization = `Bearer ${data.token}`;

        return req;
    });

    axiosInstance.interceptors.response.use(
        response => {
            return response;
        },
        async err => {
            if (err.response) {
                // Access Token was expired
                if (err.response?.status === 401) {
                    await logout();
                }
            }
            return Promise.reject(err);
        },
    );

    return axiosInstance;
};

export default useAxios;