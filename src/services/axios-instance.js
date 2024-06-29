import axios from "axios";
import {toast} from "react-toastify";
import {AUTH_TOKEN_KEY} from "@/utils/constants";
import {getLocally} from "@/utils/helper-functions";


const AUTH_KEY = getLocally(AUTH_TOKEN_KEY);
export const axiosInstance = axios.create({
    // baseURL: '/claims',
});


axiosInstance.interceptors.request.use(async (request) => {
    let token = AUTH_KEY;
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});
axiosInstance.interceptors.response.use(async (response) => {
   return response;
},  (error) => {
    if (error.response?.data?.message){
        toast.error(error.response?.data?.message);
    }
    return Promise.reject(error)
});


export const backendAxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

backendAxiosInstance.interceptors.request.use(async (request) => {
    console.log(request);
    return request;
});