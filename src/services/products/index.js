import {axiosInstance} from "@/services/axios-instance";
import {APP_API_URL} from "@/utils/api-endpoints";
import {encryptData} from "@/utils/encrypt-decrypt";
import JwtHelper from "@/utils/jwt-helper";

class ProductsApis{
    async fetchProducts (filters) {
        return new Promise(async (resolve, reject) => {
            const config = {
                params: filters
            }
            axiosInstance.get(APP_API_URL.PRODUCTS, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async createProduct (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.PRODUCTS, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                if (e.response.status === 400){
                    reject(new Error(e.response?.data.message ?? "Invalid credentials"))
                }
                else{
                    reject(new Error(e.message))
                }
            })
        })
    };
}

export const productsApis = new ProductsApis();