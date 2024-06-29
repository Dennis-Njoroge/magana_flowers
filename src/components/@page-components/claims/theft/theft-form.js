import {useFormik} from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import {
    convertToArray,
    formatDate,
    getAutoCompleteValue,
    getTrimmedNumber,
    sanitizeString
} from "@/utils/helper-functions";
import DMTCurrencyInput from "@/components/@shared-components/forms/currency-input";
import DMTDatePicker from "@/components/@shared-components/date-picker";
import {useEffect, useState} from "react";
import DMTSelectDevice from "@/components/@shared-components/forms/select-device";
import Button from "@mui/material/Button";
import {Alert, Checkbox, Divider, FormControlLabel, useMediaQuery} from "@mui/material";
import DMTChip from "@/components/@shared-components/chip";
import DMTCatureImage from "@/components/@shared-components/forms/camera";
import {Scrollbar} from "@/components/@shared-components/scrollbar";
import * as Yup from 'yup';
import ConfirmationDialog from "@/components/@shared-components/confirmation-dialog";
import {claimsTypes} from "@/utils/constants";
import {claimsApis} from "@/services/claims-apis";
import {toast} from "react-toastify";
import {useAuth} from "@/hooks/use-auth";
import DMTPhoneInput from "@/components/@shared-components/forms/phone-input";
import DMTSelectSource from "@/components/@shared-components/forms/select-claim-source";
import SaveLaterButton from "@/components/@page-components/claims/save-for-later/save-later-button";

const ALLOWED_DOCUMENTS = {
    error: 'File format is unsupported.',
    formats: ['.png', '.jpg', '.jpeg'],
    accept: ".png, .jpg, .jpeg"
}


const checkIfValid = (file) => {
    if (file){
        return ALLOWED_DOCUMENTS.formats.includes(file.extension);
    }
    return true
}

const ALLOWED_FILE_SIZES = {
    error: 'Selected File exceeds 1MB',
    size: 1024 * 5
}

const checkIfExceedsSize = (file) => {
    if (!file?.data)
    {
        return true;
    }
    const base64String = file?.data.split(',')[1];
    const fileSizeInBytes = (base64String.length * 3) / 4 - 2;
    const maxSizeInBytes = 1024 * ALLOWED_FILE_SIZES.size;
    return fileSizeInBytes <= maxSizeInBytes;
}

const TheftForm = ({ savedClaim, customerDetails, resetCustomerDetails, onSelectClaim }) => {
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [openDialog, setOpenDialog ] = useState(false);
    const {user} = useAuth();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    const initialValues =  {
        phoneId: "",
        totalCost: "",
        incidentDate: "",
        sourceOfClaim: "",
        narration: "",
        claimType: claimsTypes.THEFT.value,
        policeAbstractImage: null,
        countryCode: "+254",
        alternativePhone: "",
        deactivationImage: "",
        confirmation: false,
        submit: null,
    };

    const validationSchema = Yup.object({
        phoneId: Yup.string().required("Please select device").nullable(),
        totalCost: Yup.string().required("Replacement Cost is required!"),
        narration: Yup.string().required("Narration is required!"),
        confirmation: Yup.string().required('Please check here before you proceed'),
        alternativePhone: Yup.string()
            .min(9, "Invalid Number Provided")
            .max(9, "Invalid Number Provided"),
        incidentDate: Yup.date().required("Please select Date!"),
        policeAbstractImage: Yup.object().required("Police abstract is required!").nullable()
            .test('type',ALLOWED_DOCUMENTS.error, checkIfValid)
            .test('size',ALLOWED_FILE_SIZES.error, checkIfExceedsSize),
        deactivationImage: Yup.object().required("Deactivation image is required!").nullable()
            .test('type',ALLOWED_DOCUMENTS.error, checkIfValid)
            .test('size',ALLOWED_FILE_SIZES.error, checkIfExceedsSize),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit:  () => {
            try{
                setOpenDialog(true);
            }
            catch (e) {
                console.log(e.message);
            }
        }
    });


    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const handleOnProceed = async () => {
        try{
            const { values } = formik;
            const formData = {
                partnerCode: user?.PartnerCode,
                customerName: customerDetails?.customerName,
                phoneId: values.phoneId,
                idNumber: customerDetails.idNumber,
                claimType: claimsTypes.THEFT.value,
                partid: null,
                partCost: null,
                replacementCost: values.totalCost,
                incidentDate: formatDate(values.incidentDate, 'DD-MMM-yyyy'),
                labourCost: null,
                narration: values.narration,
                abstractAttachment: values.policeAbstractImage,
                phoneUpload: null,
                imeiUpload: null,
                userId: user?.userid,
                shopId: user?.userid,
                shopType: user?.shoptype,
                sourceOfClaim: values.sourceOfClaim,
                alternativeContact: values.alternativePhone,
                saveForLaterId: savedClaim?.id ?? 0,
                deactivationProof: values.deactivationImage
            }
            const res = await claimsApis.makeClaim(formData);

            if (res?.success){
                handleOnReset();
                onSelectClaim?.(null)
                return res?.success
            }
            else{
                toast.error(res?.errorMsg ??'Oops, an error occurred, please try again')
            }
        }
        catch (e) {
            toast.error('An error occurred, please try again later!')
        }

    }

    const handleSanitizeInput = (name, value) => {
        formik.setFieldValue(name, sanitizeString(value));
    }

    const onSelectDevice = (device) => {
        formik.setValues({
            ...formik.values,
            phoneId: device?.id,
            totalCost: device?.phoneCost,
            incidentDate: "",
        })
    }

    const handleOnChange = e => {
        const { name, value } = e.target;
        formik.setFieldValue(name, sanitizeString(value));
    };

    const handleOnReset = () => {
        formik.resetForm();
        resetCustomerDetails();
    }
    const selectedDevice = getAutoCompleteValue(selectedDevices, formik.values.phoneId);



    useEffect(() => {
        setSelectedDevices(customerDetails?.phones ?? []);
        //formik.setFieldValue("alternativePhone", getTrimmedNumber(customerDetails?.phoneNumber) ?? "")
    },[customerDetails]);

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            phoneId:savedClaim?.phoneId ?? "",
            sourceOfClaim: savedClaim?.sourceOfClaim ?? "",
            incidentDate:  Boolean(savedClaim?.incidentDate) ? new Date(savedClaim?.incidentDate)  : "",
            narration: savedClaim?.narration ?? "",
            claimType: savedClaim?.claimType ?? claimsTypes.THEFT.value,
            totalCost: savedClaim?.replacementCost ?? "",
            countryCode: "+254",
            alternativePhone: savedClaim?.alternativeContact,
            policeAbstractImage: savedClaim?.policeUpload
        })
    },[savedClaim])

    return (
        <>
            <Alert severity={'info'} >
                {"Please fill all the required details (*)"}
            </Alert>
            <Scrollbar
                autoHide={false}
                clickOnTrack={false}
                sx={{
                    height: lgUp ? "calc(100vh - 220px)" : "auto",
                    "& .simplebar-content": {
                        height: "100%",
                    },
                }}
            >
                <Box width={'100%'} sx={{
                    pt: 2,
                    pr: lgUp && 3,
                }} component={'form'} onSubmit={formik.handleSubmit}>
                <Grid container spacing={{md:2, xs:4, sm: 4}}>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTSelectSource
                            label={'Source of Claim'}
                            name={'sourceOfClaim'}
                            onBlur={formik.handleBlur}
                            value={formik.values.sourceOfClaim}
                            placeholder={"-- Select Source of Claim --"}
                            error={Boolean(formik.touched.sourceOfClaim && formik.errors.sourceOfClaim)}
                            helperText={formik.touched.sourceOfClaim && formik.errors.sourceOfClaim}
                            onChange={values => handleSanitizeInput('sourceOfClaim', values?.value ?? "")}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTSelectDevice
                            options={selectedDevices}
                            label={'Stolen Device'}
                            name={'phoneId'}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneId}
                            placeholder={"-- Choose  Device --"}
                            error={Boolean(formik.touched.phoneId && formik.errors.phoneId)}
                            helperText={formik.touched.phoneId && formik.errors.phoneId}
                            onChange={onSelectDevice}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTDatePicker
                            label={'Date of Theft'}
                            name={'incidentDate'}
                            disabled={Boolean(!selectedDevice)}
                            minYears={selectedDevice?.purchaseDate}
                            onBlur={formik.handleBlur}
                            value={formik.values.incidentDate}
                            error={Boolean(!selectedDevice && formik.touched.incidentDate && formik.errors.incidentDate)}
                            helperText={Boolean(!selectedDevice)? 'Select Device First' :formik.touched.incidentDate && formik.errors.incidentDate}
                            onChange={value => formik.setFieldValue('incidentDate', value)}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                            disableFuture={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTTextInput
                            label={'Narration'}
                            name={'narration'}
                            multiline={true}
                            minRows={3}
                            value={formik.values.narration}
                            placeholder={'Describe the incident...'}
                            error={Boolean(formik.touched.narration && formik.errors.narration)}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.narration && formik.errors.narration}
                            onChange={e => handleSanitizeInput("narration", e.target.value)}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTCurrencyInput
                            label={'Replacement Cost'}
                            name={'totalCost'}
                            disabled={true}
                            onBlur={formik.handleBlur}
                            value={formik.values.totalCost}
                            error={Boolean(formik.touched.totalCost && formik.errors.totalCost)}
                            helperText={formik.touched.totalCost && formik.errors.totalCost}
                            onChange={(values) => handleSanitizeInput('totalCost', values.value)}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTPhoneInput
                            label={'Notification Contact'}
                            name={'alternativePhone'}
                            defaultInput={false}
                            required={true}
                            countryCode={formik.values.countryCode}
                            value={formik.values.alternativePhone}
                            onChangeCountryCode={formik.handleChange}
                            type={"phoneNumber"}
                            error={Boolean(formik.touched.alternativePhone && formik.errors.alternativePhone)}
                            helperText={formik.touched.alternativePhone && formik.errors.alternativePhone}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <Divider variant={"fullWidth"} sx={{ my: 2}}>
                            <DMTChip label={'Proof of Theft'} color={'warning'}/>
                        </Divider>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTCatureImage
                            label={'Police Abstract Image'}
                            name={'policeAbstractImage'}
                            onBlur={formik.handleBlur}
                            format={ALLOWED_DOCUMENTS.accept}
                            value={formik.values.policeAbstractImage}
                            placeholder={"Take / Upload Photo"}
                            error={Boolean(formik.touched.policeAbstractImage && formik.errors.policeAbstractImage)}
                            helperText={formik.touched.policeAbstractImage && formik.errors.policeAbstractImage}
                            onChange={value => formik.setFieldValue('policeAbstractImage', value)}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTCatureImage
                            label={'Deactivation Proof'}
                            name={'deactivationImage'}
                            onBlur={formik.handleBlur}
                            format={ALLOWED_DOCUMENTS.accept}
                            value={formik.values.deactivationImage}
                            placeholder={"Take / Upload Photo"}
                            error={Boolean(formik.touched.deactivationImage && formik.errors.deactivationImage)}
                            helperText={formik.touched.deactivationImage && formik.errors.deactivationImage}
                            onChange={value => formik.setFieldValue('deactivationImage', value)}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <FormControlLabel
                            // required={!Boolean(formik.values.confirmation)}
                            checked={formik.values.confirmation}
                            control={
                                <Checkbox
                                    checked={formik.values.confirmation}
                                    onChange={e => formik.setFieldValue('confirmation', e.target.checked)}
                                    name="confirmation"
                                    // required={!Boolean(formik.values.confirmation)}
                                />
                            }
                            label="I confirm that the stolen device is deactivated."
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt:2}}>
                    <SaveLaterButton values={formik.values} claimType={claimsTypes.THEFT.value} customerDetails={customerDetails} handleOnReset={handleOnReset}/>
                    <Button disabled={!formik.values.confirmation} color={'primary'} variant={'contained'} type={'submit'}>
                        {"Submit Claim"}
                    </Button>
                </Box>
            </Box>
            </Scrollbar>
            <ConfirmationDialog
                open={openDialog}
                claim={ formik.values}
                customer={customerDetails}
                onProceed={handleOnProceed}
                onClose={handleOnClose}
            />
        </>
    )
}

export default TheftForm;