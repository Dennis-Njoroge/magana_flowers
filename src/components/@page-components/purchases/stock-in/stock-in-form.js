import {useFormik} from "formik";
import * as Yup from "yup";
import {sanitizeString} from "@/utils/helper-functions";
import Box from "@mui/material/Box";
import {Button, Grid} from "@mui/material";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import PurchaseProductItem from "@/components/@page-components/purchases/purchase-product-item";
import DMTSupplierSelect from "@/components/@shared-components/forms/select-suppliers";

const StockInForm = ({ product, onSave }) =>{
    const formik = useFormik({
        initialValues: {
            supplierId: "",
            originalQty: "",
            productId: "",
            pricePerUnit: "",
            description: "",
            submit: null,
        },
        validationSchema: Yup.object().shape({
            supplierId: Yup.string().required('Please select the supplier!'),
            originalQty: Yup.number().required('Quantity is required!'),
            pricePerUnit: Yup.string().required('Buying Price is required!'),
        }),
        onSubmit: async (values, helpers) => {
            try{
                await onSave(values, (error) => formik.setFieldError('submit', error))
            }
            catch (e) {
                helpers.setSubmitting(false);
                console.log(e.message);
            }
        }
    });

    const handleOnChange = e => {
        const { name, value } = e.target;
        formik.setFieldValue(name, sanitizeString(value));
    };

    return (
        <>
            <Box
                component={'form'}
                onSubmit={formik.handleSubmit}
            >
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                       <PurchaseProductItem product={product}/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <DMTTextInput
                            id={'quantity'}
                            label={"Quantity"}
                            fullWidth={true}
                            required={true}
                            value={formik.values.originalQty}
                            onChangeCountryCode={formik.handleChange}
                            placeholder={'Enter the quantity'}
                            name = "originalQty"
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.originalQty && formik.errors.originalQty)}
                            helperText={formik.touched.originalQty && formik.errors.originalQty}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <DMTTextInput
                            id={'pricePerUnit'}
                            label={"Buying Price"}
                            fullWidth={true}
                            required={true}
                            value={formik.values.pricePerUnit}
                            placeholder={'Enter the buying price...'}
                            onBlur={formik.handleBlur}
                            name = "pricePerUnit"
                            error={Boolean(formik.touched.pricePerUnit && formik.errors.pricePerUnit)}
                            helperText={formik.touched.pricePerUnit && formik.errors.pricePerUnit}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTSupplierSelect
                            id={'supplier_select'}
                            label={'Select Supplier'}
                            name={'supplierId'}
                            placeholder={'-- Select Supplier --'}
                            value={formik.values.supplierId}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.supplierId && formik.errors.supplierId)}
                            helperText={formik.touched.supplierId && formik.errors.supplierId}
                            required={true}
                            fullWidth={true}
                            onChange={values => formik.setFieldValue('supplierId', values?.id)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTTextInput
                            id={'description'}
                            label={"Additional Information"}
                            fullWidth={true}
                            minRows={3}
                            multiline={true}
                            value={formik.values.description}
                            placeholder={'Type here...'}
                            onBlur={formik.handleBlur}
                            name = "description"
                            error={Boolean(formik.touched.description && formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            size={'large'}
                            sx={{ mt: 2}}
                            fullWidth={true}
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </Grid>
                </Grid>

            </Box>

        </>
    )
}

export default StockInForm;