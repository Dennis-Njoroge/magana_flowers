import Box from "@mui/material/Box";
import {Divider, Typography} from "@mui/material";
import {formatCurrency, formatDate, orderStatusColor} from "@/utils/helper-functions";
import PropertyItem from "@/components/@shared-components/list/property-item";
import DMTChip from "@/components/@shared-components/chip";
import {useState} from "react";
import OrderPreviewDialog from "@/components/@page-components/order/order-preview-dialog";

const OrderItem = ({ order, onRefresh }) => {
    const color = orderStatusColor(order?.status);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <Box
                onClick={handleOnOpen}
                sx={{
                backgroundColor: 'background.paper',
                p:2,
                borderTop: 4,
                borderColor: `${color}.main`,
                '&:hover':{
                    cursor: 'pointer'
                },
            }}>
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
                    label={'Total Amount'}
                    value={formatCurrency(order?.total_amount)}
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
            </Box>
            <OrderPreviewDialog
                open={openDialog}
                onClose={handleOnClose}
                order={order}
                onRefresh={onRefresh}
            />
        </>
    )
}

export default OrderItem;