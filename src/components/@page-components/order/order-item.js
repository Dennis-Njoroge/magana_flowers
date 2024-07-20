import Box from "@mui/material/Box";
import {Divider, Typography} from "@mui/material";
import {formatCurrency, formatDate, orderStatusColor} from "@/utils/helper-functions";
import PropertyItem from "@/components/@shared-components/list/property-item";
import DMTChip from "@/components/@shared-components/chip";

const OrderItem = ({ order }) => {
    const color = orderStatusColor(order?.status);

    return (
        <>
            <Box sx={{
                backgroundColor: 'background.paper',
                p:2,
                borderTop: 4,
                borderColor: `${color}.main`
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
        </>
    )
}

export default OrderItem;