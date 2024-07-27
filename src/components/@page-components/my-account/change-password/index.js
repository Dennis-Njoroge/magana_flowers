import {useFormik} from "formik";
import {Alert, Button, Grid, Typography} from "@mui/material";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import {sanitizeString} from "@/utils/helper-functions";
import DMTPasswordInput from "@/components/@shared-components/forms/password-input";
import {usersApis} from "@/services/users";
import {PASSWORD_ACTIONS} from "@/utils/constants";
import {toast} from "react-toastify";
import {useAuth} from "@/hooks/use-auth";

const ChangePassword = ({ onClose }) => {
    const { user } = useAuth();
    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            confirmPassword: "",
            password: "",
            submit: null,
        },
        validationSchema: Yup.object().shape({
            currentPassword: Yup.string().required('Current password is required!'),
            password:  Yup.string()
                .required('Password is required!')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required!')
        }),
        onSubmit: async (values, helpers) => {
            try{
                const formData = {
                    action: PASSWORD_ACTIONS.CHANGE,
                    email: user?.email,
                    current_password: values?.currentPassword,
                    password: values.password
                }
                const res = await usersApis.changePassword(formData);
                if (res.success){
                    toast.success('Password changed successfully.');
                    onClose?.();
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
                component={'form'}
                onSubmit={formik.handleSubmit}
            >
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTPasswordInput
                            id={'currentPassword'}
                            label={"Current Password"}
                            fullWidth={true}
                            required={true}
                            value={formik.values.currentPassword}
                            onChangeCountryCode={formik.handleChange}
                            name = "currentPassword"
                            placeholder={'Enter the current password...'}
                            error={Boolean(formik.touched.currentPassword && formik.errors.currentPassword)}
                            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
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
                        <DMTPasswordInput
                            id={'confirmPassword'}
                            label={"Confirm Password"}
                            fullWidth={true}
                            required={true}
                            value={formik.values.confirmPassword}
                            onChangeCountryCode={formik.handleChange}
                            name = "confirmPassword"
                            placeholder={'Enter confirm password...'}

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
                            {formik.isSubmitting ? "Saving..." : "Save"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default ChangePassword;