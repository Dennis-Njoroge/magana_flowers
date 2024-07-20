import {useState} from "react";
import Button from "@mui/material/Button";
import DMTDialog from "@/components/@shared-components/dialog";
import {
    DialogContent,
    DialogTitle, Divider,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
    useMediaQuery
} from "@mui/material";
import {useFormik} from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import DMTCurrencyInput from "@/components/@shared-components/forms/currency-input";
import DMTPhoneInput from "@/components/@shared-components/forms/phone-input";
import {useAuth} from "@/hooks/use-auth";
import DMTPickUpPoint from "@/components/@shared-components/forms/select-pick-points";
import {orderApis} from "@/services/order";
import {toast} from "react-toastify";
import PaymentForm from "@/components/@page-components/cart/checkout/payment-form";

const steps = [
    {
        label: 'Shipping Details',
        description: '',
    },
    {
        label: 'Payment Details',
        description: '',
    },
    // {
    //     label: 'Order Summary',
    //     description: '',
    // },
]

const Checkout = ({ cartProducts, totalAmount }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [activeStep, setActiveStep]  = useState(0);
    const [orderDetails, setOrderDetails] = useState(null);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });
    const { user } = useAuth();

    const formik = useFormik({
        initialValues: {
            fullName: user?.username ?? '',
            transactionCode: '',
            phoneNumber: user?.phoneNumber ?? '',
            location: null,
            shippingFee: '',
        },
        onSubmit: async values => {
            try{
                await handleOnCreateOrder(values);
            }
            catch (e) {
                console.log(e.message)
            }
        }
    });
    const handleOnOpen = () => {
        setOpenDialog(true)
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }
    const handleOnNextStep = () => {
        setActiveStep(prevState => prevState + 1)
    }

    const handleOnLocationChange = (value) => {
        formik.setValues({
            ...formik.values,
            shippingFee: value?.charge ?? '',
            location: value?.p_name ?? null
        })
    }

    const handleOnCreateOrder = async (values) => {
        try {
            const products = cartProducts.map(cartProduct => {
                return {
                    prod_id : cartProduct?.prod_id,
                    qty: cartProduct?.prod_qty,
                    price: cartProduct?.Product?.discounted_price,
                    specifications: cartProduct?.specifications,
                }
            })
            const formData = {
                user_id: user?.id,
                full_name: values?.fullName,
                phone_no: values?.phoneNumber,
                location: values?.location,
                shipment_fee: Number(values?.shippingFee),
                products: products,
                total_amount: Number(totalAmount) + Number(values?.shippingFee)
            };
            const res = await orderApis.createOrder(formData);
            if (res?.success){
                toast.success(res?.message?? "Order saved, proceed to make payment");
                setOrderDetails(res?.data);
                handleOnNextStep();
            }
           else{
                toast.error(res?.message?? "An error occurred, please try again!")
            }
        }
        catch (e) {
            console.log(e.message)
        }

    }

    return (
        <>
            <Button variant={'contained'} onClick={handleOnOpen}>
                {"Checkout"}
            </Button>
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogTitle>
                    {"Order Checkout"}
                </DialogTitle>
                <DialogContent>
                    <Stepper activeStep={activeStep} orientation={"horizontal" }>
                        {steps.map((step) => {
                            return (
                                <Step key={step.label} >
                                    <StepLabel>
                                        {step.label}
                                    </StepLabel>
                                    <Typography variant="caption">{step.description}</Typography>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <Divider sx={{mt:1}}/>
                    {activeStep === 0 && (
                        <Box component={'form'} sx={{ mt: 2}} onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Typography>
                                        {"Please provide the following shipping details."}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <DMTTextInput
                                        id={'fullName'}
                                        label={'Full Name'}
                                        value={formik.values.fullName}
                                        onBlur={formik.handleBlur}
                                        required={true}
                                        onChange={formik.handleChange}
                                        name={'fullName'}
                                        error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                                        helperText={formik.touched.fullName && formik.errors.fullName}
                                        placeholder={'Enter your name'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <DMTPhoneInput
                                        id={'phoneNumber'}
                                        label={'Phone Number'}
                                        value={formik.values.phoneNumber}
                                        required={true}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        name={'phoneNumber'}
                                        error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                        placeholder={'e.g 712345678'}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <DMTPickUpPoint
                                        value={formik.values.location}
                                        onChange={handleOnLocationChange}
                                        required={true}
                                        fullWidth={true}
                                        label={'Select Pick-Up Point'}
                                        onBlur={formik.handleBlur}
                                        name={'location'}
                                        error={Boolean(formik.touched.location && formik.errors.location)}
                                        helperText={formik.touched.location && formik.errors.location}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <DMTCurrencyInput
                                        label={'Shipping Fee'}
                                        value={formik.values.shippingFee}
                                        disabled={true}
                                        onChange={formik.handleChange}
                                        name={'shippingFee'}
                                        error={Boolean(formik.touched.shippingFee && formik.errors.shippingFee)}
                                        helperText={formik.touched.shippingFee && formik.errors.shippingFee}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', mt:2, gap:2, justifyContent: 'flex-end'}}>
                                <Button variant={'outlined'} onClick={handleOnClose}>
                                    {"Cancel"}
                                </Button>
                                <Button variant={'contained'} type={'submit'}>
                                    {activeStep !== steps.length -1 ? "Proceed" : "Finish"}
                                </Button>
                            </Box>
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <PaymentForm orderDetails={orderDetails} onClose={handleOnClose}/>
                    )}
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default Checkout;