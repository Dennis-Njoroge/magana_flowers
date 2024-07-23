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
}

export const USER_TYPES = {
    CUSTOMER: 'customer',
    FINANCE: 'finance manager',
    SHIPMENT_MANAGER: 'shipment manager',
    DRIVER: 'driver',
    ADMIN: 'admin'
}

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
        PATHS.CUSTOMERS,
        PATHS.EMPLOYEES,
        PATHS.MY_ACCOUNT
    ],
    [USER_TYPES.FINANCE]: [
        PATHS.DASHBOARD,
        PATHS.ORDER
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