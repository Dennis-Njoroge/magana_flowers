import DMTDialog from "@/components/@shared-components/dialog";
import {
    alpha,
    Avatar,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {formatCurrency, formatDate, purchaseStatusColor} from "@/utils/helper-functions";
import PropertyItem from "@/components/@shared-components/list/property-item";
import DMTChip from "@/components/@shared-components/chip";
import Grid from "@mui/material/Grid";
import PurchaseActionButton from "@/components/@page-components/purchases/purchase-action-button";
import {PURCHASE_STATUS, USER_TYPES} from "@/utils/constants";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/use-auth";
import DownloadReceiptButton from "@/components/@page-components/purchases/download-receipt-button";



const PurchasePreviewDialog = ({ open, onClose, purchase, onRefresh}) => {
    const color = purchaseStatusColor(purchase?.status);
    const [actions, setActions] = useState([]);
    const { user } = useAuth();
    const applyActions = () => {
        let ACTIONS = [];
        if (user?.userType === USER_TYPES.STORE_MANAGER){
            if (purchase?.status === PURCHASE_STATUS.PENDING){
                ACTIONS.push(
                    {
                        label: 'Cancel Purchase',
                        status: PURCHASE_STATUS.CANCELED,
                        variant: 'outlined',
                        color: 'error'
                    },
                );
            }
            if (purchase?.status === PURCHASE_STATUS.APPROVED){
                ACTIONS.push(
                    {
                        label: 'Confirm Delivery',
                        status: PURCHASE_STATUS.DELIVERED,
                        variant: 'contained',
                        color: 'success'
                    },
                );
            }
        }
        if (user?.userType === USER_TYPES.FINANCE){
            if (purchase?.status === PURCHASE_STATUS.DELIVERED){
                ACTIONS.push(
                    {
                        label: 'Make Payment',
                        status: PURCHASE_STATUS.COMPLETED,
                        variant: 'contained',
                        color: 'success'
                    },
                )
            }
        }
        if (user?.userType === USER_TYPES.SUPPLIER){
            if (purchase?.status === PURCHASE_STATUS.PENDING){
                ACTIONS.push(
                    {
                        label: 'Confirm Purchase',
                        status: PURCHASE_STATUS.APPROVED,
                        variant: 'contained',
                        color: 'success'
                    },
                );
            }
        }

        setActions(ACTIONS)
    }

    const handleOnCloseRefresh = async () => {
        onClose();
        await onRefresh();
    }

    useEffect(() => {
        if (open){
            applyActions();
        }
    }, [open])

    return (
        <>
            <DMTDialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>
                    {"Purchase Details"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography>
                            {"Purchase No: "}
                            {purchase?.purchase_no}
                        </Typography>
                        <Typography variant={'caption'}>
                            {formatDate(purchase?.purchase_date, 'DD/MM/YYYY HH:ss a')}
                        </Typography>
                    </Box>
                    <Divider sx={{ my:1 }}/>
                    <PropertyItem
                        label={'Supplier Name'}
                        value={purchase?.User?.username}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <PropertyItem
                            label={'Payment Status'}
                            value={purchase?.payment_status}
                        />
                        <PropertyItem
                            value={<DMTChip label={purchase?.status} color={color}/>}
                        />
                    </Box>

                    <Box sx={{ mt: 1}}>
                        <Typography variant={'subtitle1'} gutterBottom>
                            {"Product Item"}
                        </Typography>
                        <PurchaseDetailsItem purchaseDetail={purchase}/>
                    </Box>
                    <PropertyItem
                        label={'Additional Information'}
                        value={purchase?.description}
                    />
                    <Box sx={{mt:2, display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            {(purchase?.payment_status === 'PAID') && (
                                <DownloadReceiptButton
                                    purchase={purchase}
                                />
                            )}
                        </Box>

                        <Box sx={{ display:'flex', gap:1}}>
                            {actions.map((action) => (
                                <PurchaseActionButton
                                    key={action.status}
                                    purchase={purchase}
                                    onClose={handleOnCloseRefresh}
                                    {...action}
                                />
                            ))}
                        </Box>

                    </Box>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

const PurchaseDetailsItem = ({ purchaseDetail }) => {

    const formattedPrice = () => {
        return formatCurrency(purchaseDetail?.price_per_unit);
    }
    const getTotalAmount = () => {
        return formatCurrency(purchaseDetail?.price_per_unit * purchaseDetail?.original_qty);
    }
    return (
        <>
            <Grid container spacing={2} sx={{ pb:1, pr:2}} alignItems={'center'}>
                <Grid item xs={6} sm={6} md={6} sx={{display: 'flex', flexDirection:' row', gap:2 }} >
                    <Avatar
                        src={purchaseDetail?.Product?.image}
                        variant={'square'}
                        sx={{
                            width: 50,
                            height: 50,
                            color: 'text.primary',
                            backgroundColor: theme => alpha(theme.palette.info.main, 0.1),
                        }}
                    />
                    <Box>
                        <Typography variant={'body2'} fontWeight={'bold'}>
                            {purchaseDetail?.Product?.prod_name}
                        </Typography>
                        <Typography variant={'caption'}>
                            {`X ${purchaseDetail?.original_qty} @`}
                            {formattedPrice()}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6} sx={{ display: 'flex', gap:1, alignItems: 'flex-end', justifyContent: 'center',  flexDirection: 'column'}}>
                    <Typography variant={'subtitle2'}>
                        {getTotalAmount()}
                    </Typography>
                </Grid>
            </Grid>

        </>
    )
}

export default PurchasePreviewDialog;