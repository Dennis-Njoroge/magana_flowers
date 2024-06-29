export const menuItems =  [
    {
        "pageName": "Dashboard",
        "route": "/dashboard/",
        "enabled": true,
        "pageIcon": "home"
    },
    {
        "pageName": "Admin Panel",
        "route": "/admin/",
        "enabled": true,
        "pageIcon": "admin_panel_settings",
        "child":[
            {
                "pageName": "Subsidiaries",
                "enabled": true,
                "route": "/admin/subsidiaries",
                "pageIcon": "group_work",
            },
            {
                "pageName": "Payment Providers",
                "enabled": true,
                "route": "/admin/payment-providers",
                "pageIcon": "payments",
            },
            {
                "pageName": "Merchants",
                "enabled": true,
                "route": "/admin/merchants",
                "pageIcon": "supervisor_account",
            },
        ]
    },
    {
        "pageName": "Transactions",
        "enabled": true,
        "route": "/dashboard/transactions/",
        "pageIcon": "edit_square",
        "child":[
            {
                "pageName": "Payment History",
                "enabled": true,
                "route": "/dashboard/transactions/payments",
                "pageIcon": "credit_card",
            },
            {
                "pageName": "Load Wallet",
                "enabled": true,
                "route": "/dashboard/transactions/load-wallet",
                "pageIcon": "account_balance_wallet",
            },
            {
                "pageName": "Collection History",
                "enabled": true,
                "route": "/dashboard/transactions/collections",
                "pageIcon": "assignment",
            },
            {
                "pageName": "Payouts",
                "enabled": true,
                "route": "/dashboard/transactions/payouts",
                "pageIcon": "credit_card",
            },
            {
                "pageName": "Reconciliation",
                "enabled": true,
                "route": "/dashboard/transactions/reconciliations",
                "pageIcon": "compare_arrows",
            }
        ]
    },
    {
        "pageName": "Transfers",
        "enabled": true,
        "route": "/dashboard/transfers/",
        "pageIcon": "swap_horiz",
        "child":[
            {
                "pageName": "Make Transfer",
                "enabled": true,
                "route": "/dashboard/transfers/make-transfer",
                "pageIcon": "move_up",
            },
            {
                "pageName": "Transfer History",
                "enabled": true,
                "route": "/dashboard/transfers/history",
                "pageIcon": "work_history",
            },

        ]
    },
    {
        "pageName": "Users",
        "route": "/dashboard/users/",
        "enabled": true,
        "pageIcon": "groups",
    },
    {
        "pageName": "Settings",
        "route": "/dashboard/settings",
        "enabled": true,
        "pageIcon": "settings",
    },
];