import {axiosInstance} from "@/services/axios-instance";
import {APP_API_URL} from "@/utils/api-endpoints";


class UsersApis{
    async fetchUsers (filters) {
        return new Promise(async (resolve, reject) => {
            const config = {
                params: filters
            }
            axiosInstance.get(APP_API_URL.USERS, config).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async addUser (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.USERS, values ).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async approveUser (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(`${APP_API_URL.USERS}/${values.id}`, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async updateUser (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.put(`${APP_API_URL.USERS}/${values.id}`, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async changePassword (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(`${APP_API_URL.USERS}/change-password`, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
}

export const usersApis = new UsersApis();