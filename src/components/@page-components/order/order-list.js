import Grid from "@mui/material/Grid";
import OrderItem from "@/components/@page-components/order/order-item";

const OrderList = ({ orders }) => {
    return (
        <>
            <Grid container spacing={2} sx={{ mt: 10 }}>
                {orders.map((order) => (
                    <Grid key={order.id} item md={4} sm={12} xs={12}>
                        <OrderItem order={order} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default OrderList;