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
import {formatCurrency, formatDate, orderStatusColor} from "@/utils/helper-functions";
import PropertyItem from "@/components/@shared-components/list/property-item";
import DMTChip from "@/components/@shared-components/chip";
import Grid from "@mui/material/Grid";
import OrderActionButton from "@/components/@page-components/order/order-action-button";
import {ORDER_STATUS, USER_TYPES} from "@/utils/constants";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/use-auth";
import DownloadReceiptButton from "@/components/@page-components/order/download-receipt-button";



const OrderPreviewDialog = ({ open, onClose, order, onRefresh}) => {
    const color = orderStatusColor(order?.status);
    const [actions, setActions] = useState([]);
    const { user } = useAuth();
    const applyActions = () => {
        let ACTIONS = [];
        if (user?.userType === USER_TYPES.CUSTOMER){
            if (order?.status === ORDER_STATUS.PENDING){
                ACTIONS.push(
                    {
                        label: 'Cancel Order',
                        status: ORDER_STATUS.CANCELED,
                        variant: 'outlined',
                        color: 'error'
                    },
                    {
                        label: 'Approve Order',
                        status: ORDER_STATUS.APPROVED,
                        variant: 'contained',
                        color: 'success'
                    },
                );
            }
            if (order?.status === ORDER_STATUS.APPROVED){
                ACTIONS.push(
                    {
                        label: 'Dispatch Order',
                        status: ORDER_STATUS.DISPATCHED,
                        variant: 'contained',
                        color: 'success'
                    },
                );
            }
            if (order?.status === ORDER_STATUS.DISPATCHED){
                ACTIONS.push(
                    {
                        label: 'Confirm Delivery',
                        status: ORDER_STATUS.DELIVERED,
                        variant: 'contained',
                        color: 'success'
                    },
                );
            }
            if (order?.status === ORDER_STATUS.DELIVERED){
                ACTIONS.push(
                    {
                        label: 'Confirm Delivery',
                        status: ORDER_STATUS.COMPLETED,
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
                    {"Order Details"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography>
                            {"Order No: "}
                            {order?.order_no}
                        </Typography>
                        <Typography variant={'caption'}>
                            {formatDate(order?.order_date, 'DD/MM/YYYY HH:ss a')}
                        </Typography>
                    </Box>
                    <Divider sx={{ my:1 }}/>
                    <PropertyItem
                        label={'Customer Name'}
                        value={order?.User?.username}
                    />
                    <PropertyItem
                        label={'Customer Phone'}
                        value={order?.ShippingDetail?.phone_no}
                    />
                    <PropertyItem
                        label={'Pick Up Point'}
                        value={order?.ShippingDetail?.location}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <PropertyItem
                            label={'Status'}
                            value={order?.payment_status}
                        />
                        <PropertyItem
                            value={<DMTChip label={order?.status} color={color}/>}
                        />
                    </Box>

                    <Box sx={{ mt: 1}}>
                        <Typography variant={'subtitle1'} gutterBottom>
                            {"Order Items"}
                        </Typography>
                        {order?.OrderDetails?.map(orderDetail => (
                            <OrderDetailsItem key={orderDetail.id} orderDetail={orderDetail}/>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'flex-end'}}>
                        <PropertyItem
                            label={'+ Shipping Fee'}
                            value={formatCurrency(order?.shipping_charge)}
                        />
                        <PropertyItem
                            label={'Total Amount'}
                            value={formatCurrency(order?.total_amount)}
                        />
                    </Box>
                    <Box sx={{ mt: 1}}>
                        <Typography variant={'subtitle1'} gutterBottom>
                            {"Driver Details"}
                        </Typography>
                        <PropertyItem
                            label={'Driver Name'}
                            value={order?.ShippingDetail?.User?.username}
                        />
                    </Box>
                    <Box sx={{mt:2, display: 'flex', justifyContent: 'space-between'}}>
                        <DownloadReceiptButton
                            order={order}
                        />
                        <Box>
                            {actions.map((action) => (
                                <OrderActionButton
                                    key={action.status}
                                    order={order}
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

const OrderDetailsItem = ({ orderDetail }) => {

    const formattedPrice = () => {
        return formatCurrency(orderDetail?.price);
    }
    return (
        <>
            <Grid container spacing={2} sx={{ pb:1, pr:2}} alignItems={'center'}>
                <Grid item xs={6} sm={6} md={6} sx={{display: 'flex', flexDirection:' row', gap:2 }} >
                    <Avatar
                        src={orderDetail?.Product?.image}
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
                            {orderDetail?.Product?.prod_name}
                        </Typography>
                        <Typography variant={'caption'}>
                            {`X ${orderDetail?.qty} @`}
                            {formattedPrice()}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6} sx={{ display: 'flex', gap:1, alignItems: 'flex-end', justifyContent: 'center',  flexDirection: 'column'}}>
                    <Typography variant={'subtitle2'}>
                        {formatCurrency(orderDetail?.total_amount)}
                    </Typography>
                </Grid>
            </Grid>

        </>
    )
}

export default OrderPreviewDialog;