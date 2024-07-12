import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useAuth} from "@/hooks/use-auth";
import Collapse from "@mui/material/Collapse";
import EmptyCart from "@/components/@page-components/cart/empty-cart";
import {getCartProducts} from "@/redux/slices/cart-slice";
import CartItems from "@/components/@page-components/cart/cart-items";

const Cart = () => {
    const { cartProducts } = useSelector(({ cart }) => cart);
    const dispatch = useDispatch();
    const { user } = useAuth();

    const fetchCartProducts = async () => {
        await dispatch(getCartProducts(user?.id));
    }

    useEffect(() => {
        fetchCartProducts();
    },[])
    return (
        <>
            <Box>
                <Grid container spacing={{ md: 4, sm:2, xs:2 }}>
                    <Grid item xs={12} md={3} sm={12}/>
                    <Grid item xs={12} md={6} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} sm={12}>
                                <Collapse in={cartProducts.length <= 0}>
                                    <EmptyCart/>
                                </Collapse>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <Collapse in={cartProducts.length > 0}>
                                    <CartItems/>
                                </Collapse>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Cart;