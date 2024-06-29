import {useFormik} from "formik";
import {Alert, Button, Grid, Typography} from "@mui/material";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import {sanitizeString} from "@/utils/helper-functions";
import Collapse from "@mui/material/Collapse";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import DMTPasswordInput from "@/components/@shared-components/forms/password-input";
import NextLink from "next/link";
import DMTPhoneInput from "@/components/@shared-components/forms/phone-input";

const RegisterForm = ( { onRegister }) => {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            submit: null,
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required('First Name is required!'),
            lastName: Yup.string().required('Last Name is required!'),
            phoneNumber: Yup.string().required('Phone Number is required!'),
            password: Yup.string()
                .required('Password is required!')
                .min(5, 'Password must be at least 5 characters long')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required!'),

            email: Yup.string()
                .email("Invalid Email Provided")
                .required("Email Address is required!")

            ,
        }),
        onSubmit: async (values, helpers) => {
            try{
                await onRegister(values, (error) => formik.setFieldError('submit', error))
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
                    borderRadius: 2,
                    boxShadow: 5,
                    px:{md: 4, sm:2, xs: 2},
                    pt:{md: 4, sm:2, xs: 2},
                    pb:{md: 4, sm:4, xs: 4}
                }}
                component={'form'}
                onSubmit={formik.handleSubmit}
            >
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box sx={{borderLeft: 5, borderColor: 'primary.main'}}>
                            <Typography sx={{ ml:1}} variant={'h5'}>
                                {"REGISTER ACCOUNT"}
                            </Typography>
                        </Box>
                        <Typography variant={'body2'} gutterBottom>
                            {"Here's your first step with us!"}
                        </Typography>
                        <Collapse in={Boolean(formik.errors.submit)}>
                            {Boolean(formik.errors.submit) && (
                                <Alert severity={"error"} variant={"standard"}>
                                    {formik.errors.submit}
                                </Alert>
                            ) }
                        </Collapse>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <DMTTextInput
                            id={'firstName'}
                            label={"First Name"}
                            fullWidth={true}
                            required={true}
                            value={formik.values.firstName}
                            onChangeCountryCode={formik.handleChange}
                            placeholder={'Enter the first name...'}
                            name = "firstName"
                            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <DMTTextInput
                            id={'lastName'}
                            label={"Last Name"}
                            fullWidth={true}
                            required={true}
                            value={formik.values.lastName}
                            onChangeCountryCode={formik.handleChange}
                            placeholder={'Enter the last name...'}
                            name = "lastName"
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTTextInput
                            id={'email'}
                            label={"Email Address"}
                            fullWidth={true}
                            required={true}
                            value={formik.values.email}
                            onChangeCountryCode={formik.handleChange}
                            placeholder={'Enter the email address...'}
                            onBlur={formik.handleBlur}
                            name = "email"
                            type={"email"}
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTPhoneInput
                            id={'phoneNumber'}
                            label={"Phone Number"}
                            fullWidth={true}
                            required={true}
                            value={formik.values.phoneNumber}
                            onChangeCountryCode={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={'Enter the phone number...'}
                            name = {"phoneNumber"}
                            error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTPasswordInput
                            id={'password'}
                            label={"Password"}
                            required={true}
                            fullWidth={true}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChangeCountryCode={formik.handleChange}
                            name = "password"
                            placeholder={'Enter the password...'}
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTPasswordInput
                            id={'confirmPassword'}
                            label={"Confirm Password"}
                            required={true}
                            fullWidth={true}
                            value={formik.values.confirmPassword}
                            onBlur={formik.handleBlur}
                            onChangeCountryCode={formik.handleChange}
                            name = "confirmPassword"
                            placeholder={'Confirm your password...'}
                            error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                            {formik.isSubmitting ? "Processing..." : "Register"}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} ms={12} lg={12}>
                        <Typography variant={'caption'} component={'span'}>
                            {"Already with an account? "}
                            <NextLink href={'/auth/login'} passHref>
                                <Typography component={'span'} variant={'inherit'} sx={{color: 'info.main'}} fontWeight={'bold'}>
                                    {"LOGIN NOW"}
                                </Typography>
                            </NextLink>
                        </Typography>
                    </Grid>
                </Grid>


            </Box>

        </>
    )
}

export default RegisterForm;