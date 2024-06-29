import {axiosInstance} from "@/services/axios-instance";
import {APP_API_URL} from "@/utils/api-endpoints";
import {encryptData} from "@/utils/encrypt-decrypt";
import JwtHelper from "@/utils/jwt-helper";

class AuthApis{
    async Login (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.LOGIN, values).then( response => {
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
    async Register (values) {
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.REGISTER, values).then( response => {
                resolve(response.data);
            }).catch(e => {
                if (e.response.status === 400){
                    reject(new Error(e.response?.data.message ?? "Validation Error"))
                }
                else{
                    reject(new Error(e.message))
                }
            })
        })
    };
    async decodeToken(accessToken) {
        return new Promise((resolve, reject) => {
            try {
                // Decode access token
                const jwt = new JwtHelper()
                const decodedToken  = jwt.decodeToken(accessToken);
                resolve(decodedToken);
            } catch (err) {
                reject(new Error("Internal server error"));
            }
        });
    }

    async validateOTP(values){
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.VALIDATE_OTP, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                if (e.response.status === 400){
                    reject(new Error(e.response?.data ?? "Invalid OTP"))
                }
                else{
                    reject(new Error(e.message))
                }
            })
        });
    }

    async resendOTP(values){
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise((resolve, reject) => {
            axiosInstance.post(APP_API_URL.RESEND_OTP, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        });
    }


}

export const authApi = new AuthApis();