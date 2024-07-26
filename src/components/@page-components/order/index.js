import {useDispatch, useSelector} from "react-redux";
import {getAllOrders} from "@/redux/slices/order-slice";
import {useAuth} from "@/hooks/use-auth";
import {useEffect} from "react";
import Box from "@mui/material/Box";
import OrderStatusFilter from "@/components/@page-components/order/order-status-filter";
import OrderList from "@/components/@page-components/order/order-list";
import {USER_TYPES} from "@/utils/constants";
import OrderDatagrid from "@/components/@page-components/order/order-datagrid";

const Order = ({ fixed = true }) => {
    const { orders, orderStatus } = useSelector(({ order }) => order);
    const { user } = useAuth();
    const dispatch = useDispatch();

    const fetchAllOrders = async (status) => {
        let filters = {
            status: status
        }
        if (user?.userType === USER_TYPES.CUSTOMER){
            filters = {
                ...filters,
                user_id: user?.id
            }
        }
        if (user?.userType === USER_TYPES.DRIVER){
            filters = {
                ...filters,
                driver_id: user?.id
            }
        }
        await dispatch(getAllOrders(filters))
    }

    useEffect(() => {
        fetchAllOrders(orderStatus);
    },[])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                <OrderStatusFilter onSearch={fetchAllOrders} fixed={fixed}/>
                {user?.userType === USER_TYPES.ADMIN ? (
                    <Box sx={{ mt: fixed ? 10 : 1 }}>
                        <OrderDatagrid data={orders}/>
                    </Box>
                ): (
                    <OrderList fixed={fixed} orders={orders} onRefresh={() => fetchAllOrders(orderStatus)}/>
                )}
            </Box>
        </>
    )
}

export default Order;