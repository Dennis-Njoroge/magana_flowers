import DMTDialog from "@/components/@shared-components/dialog";
import {alpha, Box, Collapse, DialogContent, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import PropertyItem from "@/components/@shared-components/list/property-item";
import Button from "@mui/material/Button";
import SuccessPage from "@/components/@shared-components/success-page";
import OTPInput from "react-otp-input";
import OTPCountdown from "@/hocs/otp-countdown";
import {useFormik} from "formik";
import * as Yup from "yup";
import {claimsApis} from "@/services/claims-apis";
import {useAuth} from "@/hooks/use-auth";
import {toast} from "react-toastify";
import CountDownButton from "@/components/@shared-components/buttons/countdown-button";
import {claimsTypes} from "@/utils/constants";

const OTP_LENGTH = 5;

const DispatchServiceDialog = props => {
    const { open, onClose, claim, onRefresh } = props;
    const [isSuccess, setIsSuccess] = useState(null);
    const [sentCode, setSentCode] = useState(false);
    const theme = useTheme();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues =  {
        otp: "",
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            otp: Yup.string().required("Please provide code"),
        }),
        onSubmit: async (values) => {
            try {
                const formData = {
                    shopId: user?.shoptype,
                    code: values.otp,
                    claimId: claim?.id?.toString()
                };
               const res = await claimsApis.validateDispatchCode(formData);
               if (res.success){
                   setIsSuccess(true);
                   setSentCode(false);
               }
               else{
                   toast.error(res?.errorMsg ?? "Oops! An error occurred, try again later");
               }

            } catch (e) {
                toast.error( "Oops! An error occurred, try again later");
                console.log(e.message);
            }
        },
    });

    const handleOnChange = (value) => {
        formik.setFieldValue("otp", value);
    };

    const handleOnProceed = async () => {
        setIsLoading(true);
        try{
            const formData = {
                claimId: claim?.id?.toString(),
                shopId: user?.shoptype,
                userId: user?.userid,
            }
            const res = await claimsApis.dispatchClaim(formData);
            if (res?.success){
                setSentCode(true);
                toast.success(res?.errorMsg ?? "OTP has been sent to customer!")
            }
            else{
                toast.error(res?.errorMsg ?? 'An error occurred, please try again later.')
            }
            console.log(res);
        }
        catch (e) {
            console.log(e)
        }
        setIsLoading(false);
    }

    const handleOnResendOTP = async (callBackFunc) => {
        try{
            const formData = {
                claimId: claim?.id?.toString(),
                shopId: user?.shoptype,
                userId: user?.userid,
            }
            const res = await claimsApis.resendDispatchCode(formData);
            if (res.success){
                callBackFunc?.();
                toast.success(res?.errorMsg ?? "OTP has been sent to customer!")
                formik.resetForm();
            }
            else{
                toast.error(res?.errorMsg ?? "An error occurred while processing request! Try again");
            }
        }
        catch (e) {
            toast.error( "An error occurred while processing request! Try again");
        }
    }


    useEffect(() => {
        if(open){
            setIsSuccess(null);
            setSentCode(false);
            formik.setValues(initialValues);
        }
    },[open, claim])

    return (
        <>
            <DMTDialog
                open={open}
                onClose={onClose}
            >
                <DialogContent sx={{ display: 'flex', gap:1, flexDirection: 'column'}}>
                    <Collapse in={Boolean(isSuccess === null)}>
                        <Typography variant={'h5'} color={'primary'} gutterBottom>
                            {"Dispatch Service"}
                        </Typography>
                        <Typography>
                            {"Claims Summary"}
                        </Typography>
                        <Box sx={{ my:2, backgroundColor: theme => alpha(theme.palette.primary.main, 0.1), p:2, borderRadius: 2}}>
                            <PropertyItem label={"Customer Name"} value={claim?.customerName}/>
                            <PropertyItem label={"Claim Type"} value={claim?.claimType}/>
                            <PropertyItem label={"Device IMEI"} value={claim?.imeino}/>
                            {claim?.claimType === claimsTypes.DAMAGE.value && (
                                <PropertyItem label={"Damaged Parts"} value={claim?.damagePart}/>
                            )}
                            <PropertyItem label={"Comments"} value={claim?.response}/>
                        </Box>
                        <Typography>
                        </Typography>
                        <Collapse in={!sentCode}>
                            <Button disabled={isLoading} variant={'contained'} onClick={handleOnProceed} color={'primary'}>
                                { isLoading ? "Requesting..." :"Request Code" }
                            </Button>
                        </Collapse>
                        <Collapse in={sentCode}>
                            {sentCode && (
                                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                                    <Typography sx={{ mb:2}} variant={'caption'} gutterBottom>
                                        {"A 5 digit code has been sent to the customer."}
                                    </Typography>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                mb:2,
                                                flexDirection: "column",
                                                gap: 2,
                                            }}
                                        >
                                            <OTPInput
                                                onChange={handleOnChange}
                                                value={formik.values.otp}
                                                hasErrored={Boolean(formik.errors.otp)}
                                                errorStyle={{
                                                    outline: "1px solid red",
                                                    background: alpha(theme.palette.error.main, 0.1),
                                                }}
                                                placeholder={"-----"}
                                                focusStyle={{
                                                    outline: `1px solid ${theme.palette.primary.main}`,
                                                }}
                                                inputStyle={{
                                                    width: theme.breakpoints.down('md') ? "50px" : "40px",
                                                    height: "50px",
                                                    borderRadius: "5px",
                                                    fontStyle: 'inherit',
                                                    alignItems: "center",
                                                    //fontWeight: 'bold',
                                                    borderStyle: "solid",
                                                    borderWidth: "1px",
                                                    borderColor: theme.palette.primary.main,
                                                    marginLeft: "5px",
                                                    marginRight: "5px",
                                                    background: alpha(theme.palette.primary.main, 0.1),
                                                    fontSize: '24px',
                                                    // color: theme.palette.primary.main
                                                }}
                                                renderInput={(props) => <input {...props}/>}
                                                numInputs={OTP_LENGTH}
                                                isInputNum={true}
                                                separator={<span> </span>}
                                            />
                                            { Boolean(formik.errors.otp) && (
                                                <Typography variant={"caption"} color={"error"}>
                                                    {formik.errors.otp}
                                                </Typography>
                                            )}

                                        </Box>
                                        <Box>
                                            <CountDownButton
                                                label={"Resend Code"}
                                                onClick={handleOnResendOTP}
                                            />
                                            <Button
                                                type={"submit"}
                                                disabled={
                                                    formik.isSubmitting || formik.values.otp.length !== OTP_LENGTH
                                                }
                                                variant={"contained"}
                                                color={'primary'}
                                                size={"large"}
                                            >
                                                {formik.isSubmitting ? "Validating..."  : "Validate" }
                                            </Button>
                                        </Box>
                                    </form>
                                </Box>
                            )}

                        </Collapse>
                    </Collapse>
                    <Collapse in={Boolean(isSuccess)}>
                        {Boolean(isSuccess) && (
                            <>
                                <SuccessPage  message={"Service dispatched successfully!"} onContinue={onClose} label={'Ok'}/>
                            </>
                        )}
                    </Collapse>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default DispatchServiceDialog;