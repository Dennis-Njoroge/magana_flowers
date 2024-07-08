import DMTDialog from "@/components/@shared-components/dialog";
import {Box, DialogContent, DialogTitle, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import CartButton from "@/components/@shared-components/buttons/cart-button";
import {formatCurrency} from "@/utils/helper-functions";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import * as Yup from "yup";

const ProductPreview = ({ openDialog, onClose, product}) => {
    const formik = useFormik({
        initialValues: {
            qty: 1,
        },
        validationSchema: Yup.object({
            qty: Yup.number()
                .required("Quantity is required!")
                .min(1, "Quantity cannot be less than 1")
                .max(product.qty, `Quantity cannot exceed ${product.qty}`)
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            try{
                console.log(values);
            }
            catch (e) {
             console.log(e.message);
            }
        }
    });
    const handleOnQtyChange = (value) => {
        formik.setFieldValue('qty', value);
    }
    return (
        <>
            <DMTDialog
                open={openDialog}
                onClose={onClose}
                maxWidth={'md'}
            >
                <DialogTitle>
                    {"Product Details"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={{ sm: 2, xs:2, md:6}}>
                        <Grid item md={4} sm={12} xs={12}>
                            <Image
                                src={`${product.image}`}
                                alt={product.prod_name}
                                loading="lazy"
                                width={270}
                                height={200}
                                layout={'responsive'}
                            />
                        </Grid>
                        <Grid item md={6} sm={12} xs={12}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap:1}}>
                                <Typography variant={'h4'}>
                                    {product.prod_name}
                                </Typography>
                                <Typography variant={'body1'}>
                                    {product.description}
                                </Typography>

                                <Typography variant={'h5'} gutterBottom>
                                    {formatCurrency(product.discounted_price, 'KES')}
                                </Typography>
                                <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ display: 'inherit', flexDirection: 'inherit', gap:1}}>
                                    <CartButton
                                        value={formik.values.qty}
                                        onBlur={formik.values.onBlur}
                                        error={Boolean(formik.touched.qty && formik.errors.qty)}
                                        helperText={formik.touched.qty && formik.errors.qty}
                                        name={'qty'}
                                        onChange={handleOnQtyChange}
                                    />
                                    <Typography variant={'caption'}>
                                        Available quantity is {product.qty} unit(s).
                                    </Typography>
                                    <Button type={'submit'} fullWidth={false} variant={'contained'} size={'large'}>
                                        {"Add to Cart"}
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default ProductPreview;