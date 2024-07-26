import {useFormik} from "formik";
import * as Yup from "yup";
import {sanitizeString} from "@/utils/helper-functions";
import Box from "@mui/material/Box";
import {Button, Grid, MenuItem} from "@mui/material";

import DMTTextInput from "@/components/@shared-components/forms/text-input";
import DMTPhoneInput from "@/components/@shared-components/forms/phone-input";
import {UserTypesOpts} from "@/utils/constants";

const UserForm = ({ user, onSave }) =>{
    const formik = useFormik({
        initialValues: {
            firstName: user?.first_name ?? "",
            lastName: user?.last_name ?? "",
            phoneNumber: user?.phone_no ??  "",
            userType: user?.user_type ?? "",
            email: user?.email ?? "",
            password:  "12345678",
            submit: null,
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required('First Name is required!'),
            lastName: Yup.string().required('Last Name is required!'),
            phoneNumber: Yup.string().required('Phone Number is required!'),
            userType: Yup.string().required('Role is required!'),
            email: Yup.string()
                .email("Invalid Email Provided")
                .required("Email Address is required!")
            ,
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
                        <DMTTextInput
                            select={true}
                            id={'userType'}
                            label={"Role"}
                            fullWidth={true}
                            required={true}
                            value={formik.values.userType}
                            onChangeCountryCode={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={'--Assign Role --'}
                            name = {"userType"}
                            error={Boolean(formik.touched.userType && formik.errors.userType)}
                            helperText={formik.touched.userType && formik.errors.userType}
                            onChange={handleOnChange}
                            >
                            {UserTypesOpts.map(type => (
                                <MenuItem key={type} value={type}>
                                    {type.toUpperCase()}
                                </MenuItem>
                            ))}
                        </DMTTextInput>
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

export default UserForm;