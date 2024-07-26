import {useFormik} from "formik";
import {Alert, Button, Grid, Typography} from "@mui/material";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import {sanitizeString} from "@/utils/helper-functions";
import Collapse from "@mui/material/Collapse";
import {Logo} from "@/components/logo";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import DMTPasswordInput from "@/components/@shared-components/forms/password-input";
import NextLink from "next/link";
import {useState} from "react";
import {usersApis} from "@/services/users";
import {PASSWORD_ACTIONS} from "@/utils/constants";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

const ForgotPasswordForm = props => {
    const [activeStep, setActiveStep] = useState(0);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: "",
            otp: "",
            confirmPassword: "",
            password: "",
            rememberMe: false,
            submit: null,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Invalid Email Provided")
                .required("Email Address is required!"),
            password: activeStep === 2 ? Yup.string()
                .required('Password is required!')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                ): Yup.string(),
            confirmPassword: activeStep === 2 ? Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required!') : Yup.string(),
        }),
        onSubmit: async (values, helpers) => {
            try{
                if (activeStep !== 2){
                    if (activeStep === 1) {
                        if (values.otp !== '12345'){
                            toast.error('Invalid OTP entered!');
                            return;
                        }
                    }
                    setActiveStep(prevState => prevState + 1);
                    return;
                }
                const formData = {
                    action: PASSWORD_ACTIONS.FORGOT,
                    email: values.email,
                    password: values.password
                }
                const res = await usersApis.changePassword(formData);
                if (res.success){
                    toast.success('Password changed successfully.');
                    await router.push('/auth/login');
                }
                else{
                    toast.error(res?.message);
                }
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
                sx={{
                    backgroundColor: 'background.paper',
                    //opacity: 0.9,
                    borderRadius: 2,
                    boxShadow: 5,
                    px:{md: 4, sm:2, xs: 2},
                    pt:{md: 4, sm:2, xs: 2},
                    pb:{md: 10, sm:4, xs: 4}
                }}
                component={'form'}
                onSubmit={formik.handleSubmit}
            >
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Logo/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box sx={{borderLeft: 5, borderColor: 'primary.main'}}>
                            <Typography sx={{ ml:1}} variant={'h5'}>
                                {"FORGOT PASSWORD"}
                            </Typography>
                        </Box>
                        <Typography variant={'body2'} gutterBottom>
                            {"Recover your password here"}
                        </Typography>
                        <Collapse in={Boolean(formik.errors.submit)}>
                            {Boolean(formik.errors.submit) && (
                                <Alert severity={"error"} variant={"standard"}>
                                    {formik.errors.submit}
                                </Alert>
                            ) }
                        </Collapse>
                    </Grid>
                    {activeStep === 0 && (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Collapse in={activeStep === 0}>
                                <DMTTextInput
                                    id={'email'}
                                    label={"Email Address"}
                                    fullWidth={true}
                                    autoFocus={true}
                                    required={true}
                                    value={formik.values.email}
                                    onChangeCountryCode={formik.handleChange}
                                    placeholder={'Enter the email address...'}
                                    name = "email"
                                    type={"email"}
                                    error={Boolean(formik.touched.email && formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    onChange={handleOnChange}
                                />
                            </Collapse>
                        </Grid>
                    )}
                    {
                        activeStep === 1 && (
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Collapse in={activeStep === 1}>
                                    <Button onClick={() => setActiveStep(0)} variant={'text'} color={'primary'} sx={{ mb: 2}}>
                                        {"Go back"}
                                    </Button>
                                    <DMTTextInput
                                        id={'email'}
                                        label={"Email Address"}
                                        fullWidth={true}
                                        autoFocus={true}
                                        disabled
                                        required={true}
                                        value={formik.values.email}
                                        onChangeCountryCode={formik.handleChange}
                                        placeholder={'Enter the email address...'}
                                        name = "email"
                                        type={"email"}
                                        error={Boolean(formik.touched.email && formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        onChange={handleOnChange}
                                    />
                                    <Box sx={{ mb: 2}}/>
                                    <DMTTextInput
                                        id={'otp'}
                                        label={"One Time Pin"}
                                        fullWidth={true}
                                        autoFocus={true}
                                        required={true}
                                        value={formik.values.otp}
                                        onChangeCountryCode={formik.handleChange}
                                        placeholder={'Enter OTP...'}
                                        name = "otp"
                                        error={Boolean(formik.touched.otp && formik.errors.otp)}
                                        helperText={formik.touched.otp && formik.errors.otp}
                                        onChange={handleOnChange}
                                    />
                                </Collapse>
                            </Grid>
                        )
                    }

                    {activeStep === 2 && (
                        <>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Collapse in={activeStep === 2}>
                                    <DMTPasswordInput
                                        id={'password'}
                                        label={"Password"}
                                        fullWidth={true}
                                        required={true}
                                        value={formik.values.password}
                                        onChangeCountryCode={formik.handleChange}
                                        name = "password"
                                        placeholder={'Enter the password...'}
                                        error={Boolean(formik.touched.password && formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        onChange={handleOnChange}
                                    />
                                    <Box sx={{ mb: 2}}/>
                                    <DMTPasswordInput
                                        id={'confirmPassword'}
                                        label={"Confirm Password"}
                                        fullWidth={true}
                                        required={true}
                                        value={formik.values.confirmPassword}
                                        onChangeCountryCode={formik.handleChange}
                                        name = "confirmPassword"
                                        placeholder={'Please confirm password'}

                                        error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        onChange={handleOnChange}
                                    />
                                </Collapse>
                            </Grid>
                        </>
                    )}


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
                            {formik.isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} ms={12} lg={12}>
                        <Typography variant={'caption'} component={'span'}>
                            {"Already with account? "}
                            <NextLink href={'/auth/login'} passHref>
                                <Typography component={'span'} variant={'inherit'} fontWeight={'bold'}>
                                    {"LOGIN"}
                                </Typography>
                            </NextLink>
                        </Typography>
                    </Grid>
                </Grid>


            </Box>

        </>
    )
}

export default ForgotPasswordForm;