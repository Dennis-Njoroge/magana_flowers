import {axiosInstance} from "@/services/axios-instance";
import {APP_API_URL} from "@/utils/api-endpoints";


class CartApis{
    async fetchCarts (filters) {
        return new Promise(async (resolve, reject) => {
            const config = {
                params: filters
            }
            axiosInstance.get(APP_API_URL.CART, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async createCart (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.CART, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async updateCart (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.put(`${APP_API_URL.CART}/${values.id}`, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async fetchCartCount (values) {
        const config = {
            params: values
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.get(`${APP_API_URL.CART}/count`, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async removeItemFromCart (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.delete(`${APP_API_URL.CART}/${values.id}`,).then( response => {
                resolve(response.data);
            }).catch(e => {
                    reject(new Error(e.message))
            })
        })
    };
    async clearCart (filters) {
        const config = {
            params: filters
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.delete(APP_API_URL.CART, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
}

export const cartApis = new CartApis();