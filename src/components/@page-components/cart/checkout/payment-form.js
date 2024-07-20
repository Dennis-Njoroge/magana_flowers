import {useFormik} from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import PropertyItem from "@/components/@shared-components/list/property-item";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import {formatCurrency} from "@/utils/helper-functions";
import {orderApis} from "@/services/order";
import {useRouter} from "next/router";
import {toast} from "react-toastify";


const PaymentForm = ({ orderDetails, onClose }) => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            transactionCode: ""
        },
        onSubmit: async values => {
            try{
                const formData = {
                    payment_id: values?.transactionCode,
                    id: orderDetails?.id
                }
                const res = await orderApis.updateOrderStatus(formData);
                if (res.success){
                  toast.success("Payments details saved successfully! Please wait as we process your order. Thank you");
                  router.push('/dashboard/orders');
                }
                else{
                    toast.error(res?.message);
                }
            }
            catch (e) {

            }
        }
    });

    return (
        <>
            <Box component={'form'} onSubmit={formik.handleSubmit} sx={{ mt: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} sm={12}>
                        <Typography color={'primary.main'} variant={'subtitle1'}>
                            {"MPESA Payment Instructions"}
                        </Typography>
                        <Box component={'ol'}>
                            <Typography component={'li'}>
                                Please go to <b>PAYBILL</b> Menu on MPESA.
                            </Typography>
                            <Typography component={'li'}>
                                Enter <b>233322</b> as the PAYBILL Number.
                            </Typography>
                            <Typography component={'li'}>
                                Enter <b>your order number shown below</b> as the Account Number.
                            </Typography>
                            <Typography component={'li'}>
                               Proceed and enter the order amount below.
                            </Typography>
                            <Typography component={'li'}>
                                Complete the transaction by entering your MPESA Pin.
                            </Typography>
                            <Typography component={'li'}>
                                After you receive the MPESA Message, copy the transaction code e.g SGK5BM4LOX
                                and paste it on the text box below.
                            </Typography>
                            <Typography component={'li'}>
                               Click Finish to submit the code.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <PropertyItem
                            label={'Order Number'}
                            value={orderDetails?.order_no}
                        />
                        <PropertyItem
                            label={'Total Amount'}
                            value={formatCurrency(orderDetails?.total_amount)}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTTextInput
                            id={'transactionCode'}
                            label={'MPESA Transaction Code'}
                            value={formik.values.transactionCode}
                            onBlur={formik.handleBlur}
                            required={true}
                            onChange={formik.handleChange}
                            name={'transactionCode'}
                            error={Boolean(formik.touched.transactionCode && formik.errors.transactionCode)}
                            helperText={formik.touched.transactionCode && formik.errors.transactionCode}
                            placeholder={'Enter the MPESA Code'}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', mt:2, gap:2}}>
                    <Button variant={'contained'} type={'submit'} fullWidth>
                        {"Finish"}
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default PaymentForm;