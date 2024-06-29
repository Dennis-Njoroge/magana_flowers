import {axiosInstance} from "@/services/axios-instance";
import {APP_API_URL} from "@/utils/api-endpoints";
import {encryptData} from "@/utils/encrypt-decrypt";

class ClaimsApis{
    async makeClaim (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.MAKE_CLAIM, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async fetchClaims (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.FETCH_CLAIM, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async fetchDeviceParts (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.FETCH_DEVICE_PARTS, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async searchCustomer (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.SEARCH_CUSTOMER, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async uploadClaims (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.UPLOAD_CLAIMS, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async processCreditClaims (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.PROCESS_CREDIT_CLAIM, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async dispatchClaim (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.DISPATCH_CLAIM, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async resendDispatchCode (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.RESEND_DISPATCH_CODE, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };
    async validateDispatchCode (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.VALIDATE_DISPATCH_CODE, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async notifyCustomer (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.NOTIFY_CUSTOMER, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async saveForLater (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.SAVE_CLAIM, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async fetchSavedClaims (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.FETCH_SAVED_CLAIMS, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

    async fetchSavedClaimByID (values) {
        const encryptedData = {
            data: encryptData(values)
        }
        return new Promise(async (resolve, reject) => {
            axiosInstance.post(APP_API_URL.FETCH_SAVED_CLAIM_ID, encryptedData).then( response => {
                resolve(response.data);
            }).catch(e => {
                reject(new Error(e.message))
            })
        })
    };

}

export const claimsApis = new ClaimsApis();