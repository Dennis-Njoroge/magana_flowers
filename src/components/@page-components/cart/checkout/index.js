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

const Checkout = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [activeStep, setActiveStep]  = useState(0);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });
    const { user } = useAuth();



    const formik = useFormik({
        initialValues: {
            fullName: user?.username ?? '',
            transactionCode: '',
            phoneNumber: user?.phoneNumber ?? '',
            location: '',
            shippingFee: 0,
        },
        onSubmit: async values => {
            try{
                handleOnNextStep();
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
    const handleOnPreviousStep = () => {
        setActiveStep(prevState => prevState - 1)
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
                    <Box component={'form'} sx={{ mt: 2}} onSubmit={formik.handleSubmit}>
                        {activeStep === 0 && (
                            <>
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
                                        <DMTTextInput
                                            label={'Delivery Location'}
                                            value={formik.values.location}
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
                            </>
                        )}
                        <Box sx={{ display: 'flex', mt:2, gap:2, justifyContent: 'flex-end'}}>
                            <Button variant={'outlined'} onClick={handleOnClose}>
                                {"Cancel"}
                            </Button>
                            <Button variant={'contained'} type={'submit'}>
                                {activeStep !== steps.length -1 ? "Proceed" : "Finish"}
                            </Button>
                        </Box>
                    </Box>

                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default Checkout;