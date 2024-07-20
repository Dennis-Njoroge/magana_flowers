import {useDispatch, useSelector} from "react-redux";
import {getAllOrders} from "@/redux/slices/order-slice";
import {useAuth} from "@/hooks/use-auth";
import {useEffect} from "react";
import Box from "@mui/material/Box";
import OrderStatusFilter from "@/components/@page-components/order/order-status-filter";
import OrderList from "@/components/@page-components/order/order-list";

const Order = () => {
    const { orders, orderStatus } = useSelector(({ order }) => order);
    const { user } = useAuth();
    const dispatch = useDispatch();
    const fetchAllOrders = async (status) => {
        const filters = {
            user_id: user?.id ?? null,
            status: status
        }
        await dispatch(getAllOrders(filters))
    }

    useEffect(() => {
        fetchAllOrders(orderStatus);
    },[])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                <OrderStatusFilter onSearch={fetchAllOrders} />
                <OrderList orders={orders}/>
            </Box>
        </>
    )
}

export default Order;