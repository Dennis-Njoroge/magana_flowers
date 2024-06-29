import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup';
import OTPInput from "react-otp-input";
import {alpha, Button, Typography, useTheme} from '@mui/material'
import Box from "@mui/material/Box";
import otpCountdown from "@/hocs/otp-countdown";
import OTPCountdown from "@/hocs/otp-countdown";

const OTP_LENGTH = 5;

const OtpForm = (props) => {
    const {  onSuccess, message = "", onResendOTP} = props;
    const [isResetting, setIsResetting] = useState(null);
    const theme = useTheme();
    const [enableResend, setEnableResend] = useState(false);

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: Yup.object({
            otp: Yup.string().required("Please provide OTP"),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    //pensionerId: user?.userid,
                    otp: values.otp,
                };
                await onSuccess(formData, error => formik.setFieldError('otp', error));
            } catch (e) {
               console.log(e.message);
            }
        },
    });

    const handleResendOTP = async () => {
        setIsResetting(null)
        setEnableResend(false);
        const res =  await onResendOTP(error => formik.setFieldError('otp', error));
        formik.resetForm();
        setEnableResend(!res);
        setIsResetting(res);
    };

    const handleOnChange = (value) => {
        formik.setFieldValue("otp", value);
    };

    const handleOnResendCallback = count => {
        setEnableResend(Boolean(count < 1));
    }

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 5,
                    px:4,
                    pt:4,
                    pb:8
                }}
            >
                <Typography align={'center'} variant={'h6'}>
                    {"OTP Validation"}
                </Typography>
            <Typography align={'center'} sx={{ my: 1 }}>
                {message}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            display: "flex",
                            mt: 2,
                            mb:1,
                            flexDirection: "column",
                            gap: 2,
                            justifyContent: "center",
                            alignItems: "center",
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
                        <OTPCountdown refresh={isResetting} resendCallback={handleOnResendCallback}/>
                        { Boolean(formik.errors.otp) && (
                            <Typography variant={"caption"} color={"error"}>
                                {formik.errors.otp}
                            </Typography>
                        )}

                    </Box>

                    <Box>
                        <Button
                            type={"submit"}
                            disabled={
                                formik.isSubmitting || formik.values.otp.length !== OTP_LENGTH
                            }
                            variant={"contained"}
                            color={'primary'}
                            fullWidth={true}
                            size={"large"}
                        >
                            Verify
                        </Button>

                        <Typography sx={{ mt: 2 }} align={'center'}>
                            {"If you didn't receive the OTP,  "}
                            <Button variant={'text'} color={'primary'} onClick={handleResendOTP} disabled={!enableResend}>
                              {"Resend"}
                            </Button>
                        </Typography>
                    </Box>
                </form>
            </Box>
            </Box>
        </>
    );
};

export default OtpForm;