import Grid from "@mui/material/Grid";
import OrderItem from "@/components/@page-components/order/order-item";

const OrderList = ({ orders, onRefresh, fixed = true }) => {
    return (
        <>
            <Grid container spacing={2} sx={{ mt: fixed ? 10 : 1 }}>
                {orders.map((order) => (
                    <Grid key={order.id} item md={4} sm={12} xs={12}>
                        <OrderItem order={order} onRefresh={onRefresh} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default OrderList;