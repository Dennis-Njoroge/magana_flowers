import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import {alpha, Avatar, Icon, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {formatCurrency} from "@/utils/helper-functions";
import CartButton from "@/components/@shared-components/buttons/cart-button";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {removeItemFromCart, updateCart} from "@/redux/slices/cart-slice";
import {useAuth} from "@/hooks/use-auth";

const CartItem = ({ cartProduct }) => {
    const product  = cartProduct?.Product;
    const dispatch = useDispatch();
    const { user } = useAuth();

    const formik = useFormik({
        initialValues: {
            qty: cartProduct.prod_qty,
            totalAmount: 0,
        }
    });
    const handleOnQtyChange = async (value) => {
        if (Boolean(value || Number(value) > 0 )){
            await onAddUpdateCart(value);
        }
        formik.setFieldValue('qty', value);
    }

    const formattedPrice = () => {
        return formatCurrency(product.discounted_price);
    }

    const getUnitTotal = () => {
        const total = product?.discounted_price * cartProduct?.prod_qty;

        return formatCurrency(total)
    }

    const handleOnBlur =async e => {
        await onAddUpdateCart(e.target.value);
    }

    const onAddUpdateCart = async (qty) => {
        const values = {
            id: cartProduct.id,
            prod_id: product.prod_id,
            user_id: cartProduct.user_id,
            prod_qty: Number(qty)
        }
        await dispatch(updateCart(values));
    }

    const handleOnRemove = async () => {
        const values = {
            userId: user.id,
            id: cartProduct.id
        }
        await dispatch(removeItemFromCart(values));
    }



    return (
        <Grid container spacing={2} component={Paper} sx={{ mt:1, pb:2, pr:2}} alignItems={'center'}>
            <Grid item xs={6} sm={6} md={6} sx={{display: 'flex', flexDirection:' row', gap:2 }} >
                <Avatar
                    src={product?.image}
                    variant={'square'}
                    sx={{
                        width: 50,
                        height: 50,
                        color: 'text.primary',
                        backgroundColor: theme => alpha(theme.palette.info.main, 0.1),
                    }}
                />
                <Box>
                    <Typography variant={'body1'} fontWeight={'bold'}>
                        {product.prod_name}
                    </Typography>
                    <Typography variant={'caption'}>
                        {`X ${cartProduct?.prod_qty} @`}
                        {formattedPrice()}
                    </Typography>
                    <Box>
                        <Button
                            variant={'text'}
                            startIcon={<Icon>delete</Icon>}
                            size={'small'}
                            onClick={handleOnRemove}
                        >
                            {"Remove"}
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ display: 'flex', gap:1, alignItems: 'flex-end', justifyContent: 'center',  flexDirection: 'column'}}>
                <Typography variant={'h6'}>
                    {getUnitTotal()}
                </Typography>
                <CartButton
                    width={120}
                    size={'small'}
                    value={formik.values.qty}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched.qty && formik.errors.qty)}
                    helperText={formik.touched.qty && formik.errors.qty}
                    name={'qty'}
                    onChange={handleOnQtyChange}
                />
            </Grid>
        </Grid>

    )
}

export default CartItem;