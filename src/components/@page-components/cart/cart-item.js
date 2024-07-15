import {useFormik} from "formik";
import Grid from "@mui/material/Grid";
import {alpha, Avatar, Icon, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {formatCurrency} from "@/utils/helper-functions";
import CartButton from "@/components/@shared-components/buttons/cart-button";
import Button from "@mui/material/Button";

const CartItem = ({ cartProduct }) => {
    const formik = useFormik({
        initialValues: {
            qty: cartProduct.qty,
            totalAmount: 0,
        }
    });
    const handleOnQtyChange = (value) => {
        formik.setFieldValue('qty', value);
    }

    const formattedPrice = () => {
        return formatCurrency(cartProduct.prod_price);
    }

    const getUnitTotal = () => {
        const total = cartProduct.prod_price * formik.values.qty;

        return formatCurrency(total)
    }



    return (
        <Grid container spacing={2} component={Paper} sx={{ mt:1, pb:2, pr:2}} alignItems={'center'}>
            <Grid item xs={6} sm={6} md={6} sx={{display: 'flex', flexDirection:' row', gap:2 }} >
                <Avatar
                    src={cartProduct.image}
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
                        {cartProduct.prod_name}
                    </Typography>
                    <Typography variant={'caption'}>
                        {`X ${formik.values.qty} @`}
                        {formattedPrice()}
                    </Typography>
                    <Box>
                        <Button
                            variant={'text'}
                            startIcon={<Icon>delete</Icon>}
                            size={'small'}
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
                    onBlur={formik.values.onBlur}
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