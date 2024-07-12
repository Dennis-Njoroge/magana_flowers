import DMTListItem from "@/components/@shared-components/list/list-item";
import {Box, Typography} from "@mui/material";
import CartButton from "@/components/@shared-components/buttons/cart-button";
import {useFormik} from "formik";

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
    return (
        <DMTListItem
            sx={{ backgroundColor: 'background.paper'}}
            key={cartProduct.id}
            name={cartProduct.prod_name}
            image={cartProduct.image}
            description={
                <Box sx={{ display: 'flex', alignItems: 'center', gap:1}}>
                    <Typography variant={'h6'}>
                        {`${cartProduct.prod_price} X `}
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
                </Box>
            }
            amount={cartProduct.prod_price}
        />
    )
}

export default CartItem;