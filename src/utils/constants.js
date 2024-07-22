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
    // {
    //     "pageName": "Orders",
    //     "route": "/dashboard/theft-claims",
    //     "enabled": true,
    //     "pageIcon": "published_with_changes"
    // },
    // {
    //     "pageName": "Purchases",
    //     "route": "/dashboard/theft-claims",
    //     "enabled": true,
    //     "pageIcon": "published_with_changes"
    // },
    // {
    //     "pageName": "Products",
    //     "route": "/dashboard/theft-claims",
    //     "enabled": true,
    //     "pageIcon": "published_with_changes"
    // },
    // {
    //     "pageName": "Settings",
    //     "route": "/dashboard/credit-life-claims",
    //     "enabled": true,
    //     "pageIcon": "health_and_safety"
    // },
    // {
    //     "pageName": "User Management",
    //     "route": "/dashboard/users",
    //     "enabled": true,
    //     "pageIcon": "verified",
    // },
]

export const PATHS = {
    DASHBOARD: '/dashboard',
    SHOP: '/dashboard/shop',
    MY_ACCOUNT: '/dashboard/my-account',
    CART: '/dashboard/cart',
    ORDER: '/dashboard/orders',
    DAMAGE_CLAIMS: '/dashboard/damage-claims',
    THEFT_CLAIMS: '/dashboard/theft-claims',
    CREDIT_LIFE_CLAIMS: '/dashboard/credit-life-claims',
    CLAIM_STATUS: '/dashboard/claims-status',
    DISPATCHED_STATUS: '/dashboard/dispatched-services'
}
export const ROLE_CLAIMS = {
    1 : [
        PATHS.DASHBOARD,
        PATHS.DAMAGE_CLAIMS,
        PATHS.CLAIM_STATUS,
        PATHS.DISPATCHED_STATUS
    ],
    2: [
        PATHS.DASHBOARD,
        PATHS.DAMAGE_CLAIMS,
        PATHS.THEFT_CLAIMS,
        PATHS.CLAIM_STATUS,
        PATHS.DISPATCHED_STATUS
    ],
    3: [
        PATHS.DASHBOARD,
        PATHS.DAMAGE_CLAIMS,
        PATHS.THEFT_CLAIMS,
        PATHS.CREDIT_LIFE_CLAIMS,
        PATHS.CLAIM_STATUS,
        PATHS.DISPATCHED_STATUS
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

export const USER_TYPES = {
    CUSTOMER: 'customer',
    FINANCE: 'finance manager',
    SHIPMENT_MANAGER: 'shipment manager',
    DRIVER: 'driver',
    ADMIN: 'admin'
}

export const ORDER_ACTIONS = {
    ["CUSTOMER"]:{
        [ORDER_STATUS.PENDING]: [

        ]
    }
}