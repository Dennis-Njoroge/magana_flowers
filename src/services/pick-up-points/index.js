import {axiosInstance} from "@/services/axios-instance";
import {APP_API_URL} from "@/utils/api-endpoints";


class PickUpPointsApis{
    async fetchPickPoints (filters) {
        return new Promise(async (resolve, reject) => {
            const config = {
                params: filters
            }
            axiosInstance.get(APP_API_URL.PICK_UP_POINT, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async createPickUpPoint (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.PICK_UP_POINT, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async updatePickUpPoint (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.put(`${APP_API_URL.PICK_UP_POINT}/${values.id}`, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

}

export const pickUpPointsApis = new PickUpPointsApis();