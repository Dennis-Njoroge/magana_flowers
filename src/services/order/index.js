import {axiosInstance} from "@/services/axios-instance";
import {APP_API_URL} from "@/utils/api-endpoints";


class OrderApis{
    async fetchOrders (filters) {
        return new Promise(async (resolve, reject) => {
            const config = {
                params: filters
            }
            axiosInstance.get(APP_API_URL.ORDER, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async createOrder (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.ORDER, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async updateOrderStatus (values, driverId) {
        const config = {
            params: {
                driver_id: driverId
            }
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.put(`${APP_API_URL.ORDER}/${values.id}`, values, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async fetchORDERCount (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.ORDER, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

}

export const orderApis = new OrderApis();