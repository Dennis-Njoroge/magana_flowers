import {Box, Typography} from "@mui/material";
import DMTChip from "@/components/@shared-components/chip";
import {useDispatch, useSelector} from "react-redux";
import {ORDER_STATUS} from "@/utils/constants";
import {setOrderStatus} from "@/redux/slices/order-slice";

const orderStatusOpts = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.APPROVED,
    ORDER_STATUS.DISPATCHED,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.COMPLETED
]

const OrderStatusFilter = ({ onSearch, fixed = true }) => {
    const dispatch = useDispatch();
    const { orderStatus } = useSelector(({ order }) => order);
    const handleOnClick = async value => {
        await onSearch?.(value);
        dispatch(setOrderStatus(value));
    }

    return (
        <Box sx={{
            backgroundColor: 'background.paper',
            boxShadow: 2,
            borderRadius: 1,
            py:2,
            pl:2,
            pr: 4,
            position: fixed ? 'fixed' : 'relative',
            top: fixed ? 90 : 0,
            width: '100%'
        }}>
            <Typography variant={'subtitle1'} gutterBottom>
                {"Filter by Order Status "}
            </Typography>
            <Box sx={{ display: 'flex', gap:1,  overflowX: 'auto'}}>
                <DMTChip
                    label={'All'}
                    color={ Boolean(!orderStatus) ? "primary" : "default"}
                    onClick={() => handleOnClick(null)}
                    variant={Boolean(!orderStatus)  ?  'filled' : 'outlined'}
                />
                {orderStatusOpts.map((opt) => {
                        const isSelected = Boolean(orderStatus === opt);
                        return (
                            <DMTChip
                                key={opt}
                                label={opt}
                                color={isSelected ? 'primary' : 'default'}
                                onClick={() => handleOnClick(opt)}
                                variant={isSelected ? 'filled' : 'outlined'}
                            />
                        )
                    }
                )}
            </Box>
        </Box>
    )
}

export default OrderStatusFilter;