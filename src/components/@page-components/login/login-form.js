import {useFormik} from "formik";
import {Alert, Button, Grid, Typography} from "@mui/material";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import {sanitizeString} from "@/utils/helper-functions";
import Collapse from "@mui/material/Collapse";
import {Logo} from "@/components/logo";
import DMTPhoneInput from "@/components/@shared-components/forms/phone-input";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import DMTPasswordInput from "@/components/@shared-components/forms/password-input";
import NextLink from "next/link";

const LoginForm = props => {
    const { onLogin } = props;
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            submit: null,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Invalid Email Provided")
                .required("Email Address is required!"),
            password: Yup.string()
                .required('Password is required!')
        }),
        onSubmit: async (values, helpers) => {
            try{
                await onLogin(values, (error) => formik.setFieldError('submit', error))
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
                                {"LOGIN"}
                            </Typography>
                        </Box>
                        <Typography variant={'body2'} gutterBottom>
                            {"Welcome Back, please log in to continue"}
                        </Typography>
                        <Collapse in={Boolean(formik.errors.submit)}>
                            {Boolean(formik.errors.submit) && (
                                <Alert severity={"error"} variant={"standard"}>
                                    {formik.errors.submit}
                                </Alert>
                            ) }
                        </Collapse>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
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
                            {formik.isSubmitting ? "Validating..." : "Login"}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} ms={12} lg={12}>
                        <Typography variant={'caption'} component={'span'}>
                            {"Don't have an account? "}
                            <NextLink href={'/auth/register'} passHref>
                                <Typography component={'span'} variant={'inherit'} sx={{color: 'info.main'}} fontWeight={'bold'}>
                                    {"REGISTER NOW"}
                                </Typography>
                            </NextLink>
                        </Typography>
                    </Grid>
                </Grid>


            </Box>

        </>
    )
}

export default LoginForm;