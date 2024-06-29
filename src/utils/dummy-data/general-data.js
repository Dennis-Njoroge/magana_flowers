export const claimsData = [
    {
        id:2,
        customerId: 2,
        customerName: 'Isaac Mwangi',
        idNumber: '87654321',
        claimsRefNo: 'S/SAF/436734384',
        phoneNumber: '715264018',
        imeiNo: 'IMEI12132121',
        claimType: 'Theft',
        claimStatus: 'Pending',
        approverComments: '',
        claimDate: '2024-01-30',
        devices: [
            {
                id:1,
                deviceModel: "MODEL-123#",
                imeiNo: '516424657218532',
            },
            {
                id:2,
                deviceModel: "MODEL-456#",
                imeiNo: '013713580364407',
            }
        ]
    },
    {
        id:3,
        customerId: 3,
        customerName: 'Eunice Kimeli',
        idNumber: '1234321',
        claimsRefNo: 'S/SAF/476384839',
        imeiNo: 'IMEI5237723',
        phoneNumber: '790283032',
        claimType: 'Damage',
        claimStatus: 'Declined',
        approverComments: '',
        claimDate: '2024-01-31',
        devices: [
            {
                id:1,
                deviceModel: "MODEL-123#",
                imeiNo: '516424657218532',
            },
            {
                id:2,
                deviceModel: "MODEL-456#",
                imeiNo: '013713580364407',
            }
        ]
    },
    {
        id:4,
        customerId: 4,
        customerName: 'Mathew Ndogoh',
        idNumber: '1234321',
        claimsRefNo: 'S/SAF/476384839',
        imeiNo: 'IMEI5237723',
        phoneNumber: '790283032',
        claimType: 'Theft',
        claimStatus: 'Approved',
        approverComments: 'Replace Device',
        claimDate: '2024-01-31',
        devices: [
            {
                id:1,
                deviceModel: "MODEL-123#",
                imeiNo: '516424657218532',
            },
            {
                id:2,
                deviceModel: "MODEL-456#",
                imeiNo: '013713580364407',
            }
        ]
    },
    {
        id:4,
        customerId: 3,
        customerName: 'Hellen Wangu',
        idNumber: '1234321',
        claimsRefNo: 'S/SAF/476384839',
        imeiNo: 'IMEI5237723',
        phoneNumber: '790283032',
        claimType: 'Damage',
        claimStatus: 'Approved',
        approverComments: 'Repair Device',
        claimDate: '2024-01-31',
        devices: [
            {
                id:1,
                deviceModel: "MODEL-123#",
                imeiNo: '516424657218532',
            },
            {
                id:2,
                deviceModel: "MODEL-456#",
                imeiNo: '013713580364407',
            }
        ]
    },
];
export const dispatchedData = [
    {
        id:1,
        customerId: 7,
        customerName: 'Dennis Njoroge',
        claimsRefNo: 'S/SAF/235266232',
        imeiNo: 'IMEI12181921',
        phoneNumber: '701824145',
        idNumber: '12345678',
        claimType: 'Damage',
        claimStatus: 'Dispached',
        approverComments: 'Proceed & Repair',
        claimDate: '2024-01-31',
        devices: [
            {
                id:1,
                deviceModel: "MODEL-123#",
                imeiNo: '516424657218532',
            },
            {
                id:2,
                deviceModel: "MODEL-456#",
                imeiNo: '013713580364407',
            }
        ]
    },
];