export const COUNTRIES = [
    // {
    //     name: "Tanzania, United Republic of Tanzania",
    //     dialCode: "+255",
    //     isoCode: "TZ",
    //     flag: "https://cdn.kcak11.com/CountryFlags/countries/tz.svg",
    // },
    {
        name: "Kenya",
        dialCode: "+254",
        isoCode: "KE",
        flag: "https://cdn.kcak11.com/CountryFlags/countries/ke.svg",
    },
    {
        name: "Uganda",
        dialCode: "+256",
        isoCode: "UG",
        flag: "https://cdn.kcak11.com/CountryFlags/countries/ug.svg",
    },
    {
        name: "Rwanda",
        dialCode: "+250",
        isoCode: "RW",
        flag: "https://cdn.kcak11.com/CountryFlags/countries/rw.svg",
    }
];
export const APP_NAME = "Magana Flowers Portal";
export const AUTH_TOKEN_KEY = 'accessToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';
export const PREFIX  = 'MFL';
export const PURCHASE_PREFIX  = 'MFP';

export const claimsTypes = {
    DAMAGE: {
        name: 'Damage',
        value:'damage',
    },
    THEFT:  {
        name: 'Theft',
        value:'theft',
    },
    CREDIT_LIFE:  {
        name: 'Credit Life',
        value:'creditlife',
    },
}
export const paymentProviderTypes = [
    {
        id: 1,
        name: 'M-Pesa',
        value: 'MPESA',
    },
]
export const userMenus = [
    {
        "pageName": "Home",
        "route": "/dashboard",
        "enabled": true,
        "pageIcon": "home"
    },
    {
        "pageName": "Shop",
        "route": "/dashboard/shop",
        "enabled": true,
        "pageIcon": "local_mall"
    },
    {
        "pageName": "Products",
        "route": "/dashboard/products",
        "enabled": true,
        "pageIcon": "inventory_2"
    },
    {
        "pageName": "Customers",
        "route": "/dashboard/customers",
        "enabled": true,
        "pageIcon": "people"
    },
    {
        "pageName": "Employees",
        "route": "/dashboard/employees",
        "enabled": true,
        "pageIcon": "engineering"
    },
    {
        "pageName": "Suppliers",
        "route": "/dashboard/suppliers",
        "enabled": true,
        "pageIcon": "people"
    },
    {
        "pageName": "Users Accounts",
        "route": "/dashboard/users",
        "enabled": true,
        "pageIcon": "people"
    },

    {
        "pageName": "My Cart",
        "route": "/dashboard/cart",
        "enabled": true,
        "pageIcon": "shopping_cart"
    },
    {
        "pageName": "Orders",
        "route": "/dashboard/orders",
        "enabled": true,
        "pageIcon": "list_alt"
    },
    {
        "pageName": "Payments",
        "route": "/dashboard/payments",
        "enabled": true,
        "pageIcon": "money"
    },
    {
        "pageName": "My Account",
        "route": "/dashboard/my-account",
        "enabled": true,
        "pageIcon": "manage_accounts"
    },

]

export const PATHS = {
    DASHBOARD: '/dashboard',
    SHOP: '/dashboard/shop',
    MY_ACCOUNT: '/dashboard/my-account',
    CART: '/dashboard/cart',
    ORDER: '/dashboard/orders',
    PAYMENTS: '/dashboard/payments',
    PRODUCTS: '/dashboard/products',
    USERS: '/dashboard/users',
    CUSTOMERS: '/dashboard/customers',
    EMPLOYEES: '/dashboard/employees',
    SUPPLIER: '/dashboard/suppliers',
}

export const USER_TYPES = {
    CUSTOMER: 'customer',
    SUPPLIER: 'supplier',
    FINANCE: 'finance',
    SHIPMENT_MANAGER: 'shipment manager',
    DRIVER: 'driver',
    ADMIN: 'admin',
    STORE_MANAGER: 'store manager'
}

export const UserTypesOpts = [
    USER_TYPES.ADMIN,
    USER_TYPES.CUSTOMER,
    USER_TYPES.FINANCE,
    USER_TYPES.SHIPMENT_MANAGER,
    USER_TYPES.DRIVER,
    USER_TYPES.STORE_MANAGER,
    USER_TYPES.SUPPLIER
]


export const ROLE_CLAIMS = {
    [USER_TYPES.CUSTOMER] : [
        PATHS.DASHBOARD,
        PATHS.SHOP,
        PATHS.CART,
        PATHS.ORDER,
        PATHS.MY_ACCOUNT
    ],
    [USER_TYPES.ADMIN]: [
        PATHS.DASHBOARD,
        PATHS.PRODUCTS,
        PATHS.PAYMENTS,
        PATHS.USERS,
        PATHS.ORDER,
        PATHS.CUSTOMERS,
        PATHS.EMPLOYEES,
        PATHS.SUPPLIER,
        PATHS.MY_ACCOUNT
    ],
    [USER_TYPES.FINANCE]: [
        PATHS.DASHBOARD,
        PATHS.ORDER,
        PATHS.PAYMENTS,
        PATHS.MY_ACCOUNT
    ],
    [USER_TYPES.STORE_MANAGER]: [
        PATHS.DASHBOARD,
        PATHS.PRODUCTS,
        PATHS.MY_ACCOUNT
    ],
    [USER_TYPES.DRIVER]: [
        PATHS.DASHBOARD,
        PATHS.ORDER,
        PATHS.MY_ACCOUNT
    ],
    [USER_TYPES.SHIPMENT_MANAGER]: [
        PATHS.DASHBOARD,
        PATHS.ORDER,
        PATHS.MY_ACCOUNT
    ]
}

export const ORDER_STATUS = {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    DISPATCHED: 'Dispatched',
    DELIVERED: 'Delivered',
    COMPLETED: 'Completed',
    CANCELED: 'Cancelled',
}

export const PURCHASE_STATUS = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    DELIVERED: 'DELIVERED',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELLED',
}



export const ORDER_ACTIONS = {
    ["CUSTOMER"]:{
        [ORDER_STATUS.PENDING]: [

        ]
    }
}

export const PASSWORD_ACTIONS = {
    CHANGE: 'CHANGE_PASSWORD',
    FORGOT: 'FORGOT_PASSWORD',
    RESET: 'RESET_PASSWORD',
}