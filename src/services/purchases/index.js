import {axiosInstance} from "@/services/axios-instance";
import {APP_API_URL} from "@/utils/api-endpoints";


class PurchasesApis{
    async fetchPurchases (filters) {
        return new Promise(async (resolve, reject) => {
            const config = {
                params: filters
            }
            axiosInstance.get(APP_API_URL.PURCHASES, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async createPurchases (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.PURCHASES, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async updatePurchasesStatus (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.put(`${APP_API_URL.PURCHASES}/${values.id}`, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async generateReceipt (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(`${APP_API_URL.PURCHASES}/${values.id}/receipt`, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

}

export const purchasesApis = new PurchasesApis();