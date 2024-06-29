import {List, Typography, useMediaQuery} from "@mui/material";
import DMTDataGrid from "@/components/@shared-components/data-grid";
import DMTChip from "@/components/@shared-components/chip";
import DMTListItem from "@/components/@shared-components/list/list-item";
import Box from "@mui/material/Box";
import {useState} from "react";
import ActionMenus from "@/components/@page-components/approval-status/action-menus";

const ApprovalsDatagrid = props => {
    const { data, report, onRefresh } = props;
    const [selectedClaim, setSelectedClaim] = useState(null);
    const columns = [
        {
            label : 'Date',
            attribute: 'claimDate',
            value : (row) => {
                return (
                    <>
                        <Typography variant={'inherit'}>
                            {row?.claimDate}
                        </Typography>
                    </>
                )
            },
        },
        {
            label : 'Reference Number',
            attribute: 'claimRefNumber',
        },
        {
            label: 'Client Name',
            attribute: 'customerName',
        },
        {
            label: 'Device IMEI',
            attribute: 'imeino',
            value : (row) => {
                return (
                    <>
                        <Typography variant={'inherit'} fontWeight={'bold'}>
                            {row?.imeino}
                        </Typography>
                    </>
                )
            },
        },
        {
            label: 'Claim Type',
            attribute: 'claimType',
        },
        {
            label: 'Status',
            attribute: 'claimStatus',
            value: data => {
                const color = data.claimStatus === 'approved' ? 'success' : data.claimStatus === 'pending' ? 'warning' : 'error';
                return (
                    <DMTChip
                        color={color}
                        label={data.claimStatus?.toUpperCase()}
                    />
                )
            }
        },
        {
            label: 'Approver Comments',
            attribute: 'response',
        },
        // {
        //     label: 'Dispatch Status',
        //     attribute: 'dispatched',
        //     value: data => {
        //         const color = data.dispatched ? 'success' :  'warning';
        //         return (
        //             <DMTChip
        //                 color={color}
        //                 label={data.dispatched ? "Dispatched" : "Pending"}
        //             />
        //         )
        //     }
        // },
        {
            label: 'Dispatch Status',
            visible: !report,
            value: (row) => {
                if (row.claimStatus !== 'approved') {
                    return row.claimStatus === 'pending' ? 'Awaiting Approval' : 'N/A';
                }
                return (
                    <ActionMenus claim={row} onRefresh={onRefresh}/>
                )
            }
        }
    ];
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    return (
        <>
            {lgUp ? (
                <DMTDataGrid
                    columns={columns}
                    data={data}
                    sx={{ width: '100%'}}
                />
            ): (
                <>
                    <List dense>
                        {data.length > 0 ? data.map( (claim, index) => (
                            <DMTListItem
                                key={index}
                                name={claim.customerName}
                                description={
                                <Box>
                                    <Typography variant={'caption'}>
                                        {`REF: ${claim?.claimRefNumber} | ${claim.claimType} | `}
                                        <Typography
                                            variant={'caption'}
                                            sx={{
                                                color: claim?.claimStatus === 'approved' ? 'success.main'
                                                    : claim?.claimStatus === 'pending' ? 'warning.main'
                                                        : 'error.main'
                                            }}>
                                            {claim?.claimStatus?.toUpperCase()}
                                        </Typography>
                                    </Typography>
                                    <Typography variant={'body2'}>
                                        Comments: {claim?.response ?? "-"}
                                    </Typography>
                                    {claim?.claimStatus === 'approved' && (
                                        <ActionMenus claim={claim}/>
                                    ) }
                                </Box>
                            }
                            />
                        )) : (
                            <>
                                <Typography>
                                    {"No records found."}
                                </Typography>
                            </>
                        )}
                    </List>
                </>
            )}

        </>
    )
}

export default ApprovalsDatagrid;