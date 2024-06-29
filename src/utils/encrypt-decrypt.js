import SimpleCrypto from "simple-crypto-js";

const secretKey = new SimpleCrypto(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);
export const encryptData = (data) => {
    return  data;
    if (data){
        return secretKey.encrypt(data)
    }
}

export const decryptData = (data) => {
    return  data;
    if (data){
        return secretKey.decrypt(data)
    }
}