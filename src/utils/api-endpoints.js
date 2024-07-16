//------------------------ Backend APIs ----------------------//
export const API_URL = {
    /***************** AUTH APIS **********************/
    LOGIN: '/api/claim/v1/claim/authenticate',
    VALIDATE_OTP: '/api/claim/v1/claim/validateotp',
    RESEND_OTP: '/api/claim/v1/claim/resendotp',
    REFRESH_TOKEN: '',

    /***************** CLAIM APIS **********************/
    MAKE_CLAIM: '/api/claim/v1/claim/makeclaim',
    SEARCH_CUSTOMER: '/api/claim/v1/claim/querycustomer',
    FETCH_CLAIMS: '/api/claim/v1/claim/queryclaims',
    FETCH_DEVICE_PARTS: '/api/claim/v1/claim/getdamagedparts',
    UPLOAD_CLAIMS: '/api/claim/v1/claim/uploadcreditlife',

    PROCESS_CREDIT_CLAIM: '/api/claim/v1/claim/approveupload',
    NOTIFY_CUSTOMER: '/api/claim/v1/claim/sendnotification',
    DISPATCH_CLAIM: '/api/claim/v1/claim/dispatch',
    VALIDATE_DISPATCH_CODE: '/api/claim/v1/claim/validatedispatchcode',
    SAVE_CLAIM: '/api/claim/v1/claim/saveforlater',
    FETCH_SAVED_CLAIMS: '/api/claim/v1/claim/getsaveforlater',
    RESEND_DISPATCH_CODE: '/api/claim/v1/claim/resenddispatch',


}

//------------------------ Application APIs ----------------------//
export const APP_API_URL = {
    /***************** AUTH APIS **********************/
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    VALIDATE_OTP: '/api/auth/validate-otp',
    RESEND_OTP: '/api/auth/resend-otp',
    REFRESH_TOKEN: '/api/',


    PRODUCTS: '/api/products',
    CATEGORIES: '/api/categories',
    CART: '/api/cart',

    /***************** CLAIM APIS **********************/
    MAKE_CLAIM: '/api/claims/make-claim',
    SEARCH_CUSTOMER: '/api/claims/search-customer',
    FETCH_CLAIM: '/api/claims/fetch-claims',
    FETCH_DEVICE_PARTS: '/api/claims/fetch-device-parts',
    UPLOAD_CLAIMS: '/api/claims/upload-claims',
    PROCESS_CREDIT_CLAIM: '/api/claims/process-credit-claim',
    NOTIFY_CUSTOMER: '/api/claims/notify-customer',
    DISPATCH_CLAIM: '/api/claims/dispatch-claims',
    VALIDATE_DISPATCH_CODE: '/api/claims/validate-dispatch-code',
    SAVE_CLAIM: '/api/claims/save-claim',
    FETCH_SAVED_CLAIMS: '/api/claims/fetch-saved-claims',
    FETCH_SAVED_CLAIM_ID: '/api/claims/fetch-saved-claim-id',
    RESEND_DISPATCH_CODE: '/api/claims/resend-dispatch-code',
}

export const API_METHODS = {
    GET:'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

