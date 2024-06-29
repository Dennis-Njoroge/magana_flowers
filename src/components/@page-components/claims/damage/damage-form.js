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
import {useSelector} from "react-redux";
import DMTSelectDamagedParts from "@/components/@shared-components/forms/select-damaged-parts";
import Button from "@mui/material/Button";
import {Alert, Divider, useMediaQuery} from "@mui/material";
import DMTChip from "@/components/@shared-components/chip";
import DMTCatureImage from "@/components/@shared-components/forms/camera";
import {Scrollbar} from "@/components/@shared-components/scrollbar";
import * as Yup from 'yup';
import ConfirmationDialog from "@/components/@shared-components/confirmation-dialog";
import {claimsApis} from "@/services/claims-apis";
import {useAuth} from "@/hooks/use-auth";
import {claimsTypes} from "@/utils/constants";
import {toast} from "react-toastify";
import PhoneInput from "@/components/@shared-components/forms/phone-input";
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

const DamageForm = ({ savedClaim, customerDetails, resetCustomerDetails, onSelectClaim }) => {
    const [selectedDevices, setSelectedDevices] = useState([]);
    const { damagedParts } = useSelector(({ claims }) => claims );
    const { user } = useAuth();
    const [openDialog, setOpenDialog ] = useState(false);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    const initialValues =  {
        phoneId: "",
        damagedPart: [],
        laborCost: "",
        damagePartCost: "",
        sourceOfClaim: "",
        incidentDate: "",
        narration: "",
        claimType: "Damage",
        totalCost: "",
        damagedPhoneImage: null,
        imeiNumberImage: null,
        countryCode: "+254",
        alternativePhone: "",
        submit: null,
    };
    const validationSchema = Yup.object({
        phoneId: Yup.string().required("Please select device").nullable(),
        damagedPart: Yup.array().required("Please select damaged part").nullable(),
        laborCost: Yup.string().required("Labor Cost is required!"),
        damagePartCost: Yup.string().required("Part Cost is required!"),
        narration: Yup.string().required("Narration is required!"),
        alternativePhone: Yup.string()
            .min(9, "Invalid Number Provided")
            .max(10, "Invalid Number Provided"),
        incidentDate: Yup.date().required("Please select Date!"),
        damagedPhoneImage: Yup.object()
            .required("Damaged phone image is required!")
            .test('type',ALLOWED_DOCUMENTS.error, checkIfValid)
            .test('size',ALLOWED_FILE_SIZES.error, checkIfExceedsSize),

        imeiNumberImage: Yup.object().required("IMEI No image is required!")
            .test('type',ALLOWED_DOCUMENTS.error, checkIfValid)
            .test('size',ALLOWED_FILE_SIZES.error, checkIfExceedsSize),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ( ) => {
            setOpenDialog(true);
        }
    });

    const handleOnProceed = async () => {
        try{
            const { values } = formik;
            const partsIds = values?.damagedPart?.map(obj => obj.id);
            const formData = {
                partnerCode: user?.PartnerCode,
                customerName: customerDetails?.customerName,
                phoneId: values.phoneId,
                idNumber: customerDetails.idNumber,
                claimType: claimsTypes.DAMAGE.value,
                partid: partsIds,
                partCost: values.damagePartCost,
                replacementCost: values.totalCost,
                incidentDate: formatDate(values.incidentDate, 'DD-MMM-yyyy'),
                labourCost: values.laborCost,
                narration: values.narration,
                abstractAttachment: null,
                phoneUpload: values.damagedPhoneImage,
                imeiUpload: values.imeiNumberImage,
                userId: user?.userid,
                shopId: user?.userid,
                shopType: user?.shoptype,
                alternativeContact: values.alternativePhone,
                sourceOfClaim: values.sourceOfClaim,
                saveForLaterId: savedClaim?.id ?? 0,
            }
            const res = await claimsApis.makeClaim(formData);
            if (res?.success){
                onSelectClaim?.(null)
                handleOnReset();
                return res?.success
            }
            else{
                toast.error(res?.errorMsg ?? 'Oops, an error occurred, please try again')
            }
        }
        catch (e) {
            toast.error('An error occurred, please try again later!')
        }

    }


    const handleOnReset = () => {
        formik.resetForm();
        resetCustomerDetails();
    }

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const handleSanitizeInput = (name, value) => {
        formik.setFieldValue(name, sanitizeString(value));
    }

    const computeTotalCost = (price1, price2) => {
        const number1 = price1 ? Number(price1) : 0;
        const number2 = price2 ? Number(price2) : 0;
        return number1 + number2;
    }

    
    
    const onSelectedPart = devices => {
        let totalAmount = devices.reduce((total, device) => total + (device?.partCosts || 0), 0);
        let maxAmountLabor = devices.reduce((max, item) => Math.max(max, item?.laborCost), 0);


        formik.setValues({
            ...formik.values,
            damagedPart: devices,
            damagePartCost: totalAmount ,
            laborCost: maxAmountLabor,
            totalCost: computeTotalCost(totalAmount , maxAmountLabor )
        })
    }

    const onChangePartCost = value => {
        formik.setValues({
            ...formik.values,
            damagePartCost: value ?? "",
            totalCost: computeTotalCost(value ?? 0, formik.values.laborCost ?? 0)
        })
    }
    const onChangeLaborCost = value => {
        formik.setValues({
            ...formik.values,
            laborCost: value ?? "",
            totalCost: computeTotalCost(formik.values.damagePartCost ?? 0, value ?? 0)
        })
    }

    const onSelectDevice = (device) => {
        formik.setValues({
            ...formik.values,
            phoneId: device?.id,
            incidentDate: "",
            damagedPart: []
        })
    }

    const handleOnChange = e => {
        const { name, value } = e.target;
        formik.setFieldValue(name, sanitizeString(value));
    };

    const damagePartDetails = getAutoCompleteValue(damagedParts, Number(formik.values.damagedPart));


    const selectedDevice = getAutoCompleteValue(selectedDevices, formik.values.phoneId);



    useEffect(() => {
        setSelectedDevices(customerDetails?.phones ?? []);
        //formik.setFieldValue("alternativePhone", getTrimmedNumber(customerDetails?.phoneNumber) ?? "")
    },[customerDetails]);

    useEffect(() => {
        const damagedPart = convertToArray(savedClaim?.partsid);
        formik.setValues({
            ...formik.values,
            phoneId:savedClaim?.phoneId ?? "",
            damagedPart: damagedPart,
            laborCost: savedClaim?.labourCost ?? "",
            damagePartCost: savedClaim?.partCost ?? "",
            sourceOfClaim: savedClaim?.sourceOfClaim ?? "",
            incidentDate: Boolean(savedClaim?.incidentDate) ? new Date(savedClaim?.incidentDate)  : "",
            narration: savedClaim?.narration ?? "",
            claimType: savedClaim?.claimType ?? claimsTypes.DAMAGE.value,
            totalCost: savedClaim?.replacementCost ?? "",
            damagedPhoneImage:  Boolean(savedClaim?.phoneUpload) ? JSON.parse(savedClaim?.phoneUpload) : null,
            imeiNumberImage:  Boolean(savedClaim?.imeiUpload) ? JSON.parse(savedClaim?.imeiUpload)  : null,
            countryCode: "+254",
            alternativePhone: savedClaim?.alternativeContact
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
                            label={'Damaged Device'}
                            name={'phoneId'}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneId}
                            placeholder={"-- Choose Damaged Device --"}
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
                            label={'Date of Damage'}
                            disabled={Boolean(!selectedDevice)}
                            minYears={selectedDevice?.purchaseDate}
                            name={'incidentDate'}
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
                        <DMTSelectDamagedParts
                            options={damagedParts}
                            customerId={customerDetails?.idNumber}
                            phoneId={formik.values.phoneId}
                            label={'Damaged Part'}
                            disabled={Boolean(!selectedDevice)}
                            placeholder={'-- Choose Damaged Part --'}
                            value={formik.values.damagedPart}
                            name={'damagedPart'}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.touched.damagedPart && formik.errors.damagedPart)}
                            helperText={Boolean(!selectedDevice)? 'Select Device First' : formik.touched.damagedPart && formik.errors.damagedPart}
                            onChange={onSelectedPart}
                            defaultInput={false}
                            fullWidth={true}
                            required={formik.values?.damagedPart?.length < 1}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTTextInput
                            label={'Narration'}
                            name={'narration'}
                            multiline={true}
                            minRows={3}
                            value={formik.values.narration}
                            placeholder={'Describe the damage...'}
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
                            label={'Damaged Part Cost'}
                            name={'damagePartCost'}
                            onBlur={formik.handleBlur}
                            defaultInput={false}
                            disabled={Boolean(!damagePartDetails || damagePartDetails?.partCosts > 0)}
                            value={formik.values.damagePartCost}
                            error={Boolean(formik.touched.damagePartCost && formik.errors.damagePartCost)}
                            helperText={formik.touched.damagePartCost && formik.errors.damagePartCost}
                            onChange={(values) => onChangePartCost(values?.value ?? 0)}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTCurrencyInput
                            label={'Labor Cost'}
                            name={'laborCost'}
                            disabled={Boolean(!damagePartDetails || damagePartDetails?.laborCost > 0)}
                            onBlur={formik.handleBlur}
                            value={formik.values.laborCost}
                            error={Boolean(formik.touched.laborCost && formik.errors.laborCost)}
                            helperText={formik.touched.laborCost && formik.errors.laborCost}
                            onChange={(values) => onChangeLaborCost(values?.value ?? 0)}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTCurrencyInput
                            label={'Total Repair Cost'}
                            name={'totalCost'}
                            disabled={true}
                            onBlur={formik.handleBlur}
                            value={formik.values.totalCost}
                            error={Boolean(formik.touched.totalCost && formik.errors.totalCost)}
                            onChange={(values) => handleSanitizeInput('totalCost', values.value)}
                            helperText={formik.touched.totalCost && formik.errors.totalCost}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTPhoneInput
                            label={'Notification Contact'}
                            name={'alternativePhone'}
                            required={true}
                            defaultInput={false}
                            countryCode={formik.values.countryCode}
                            value={formik.values.alternativePhone}
                            onChangeCountryCode={formik.handleChange}
                            type={"phoneNumber"}
                            error={Boolean(formik.touched.alternativePhone && formik.errors.alternativePhone)}
                            helperText={formik.touched.alternativePhone && formik.errors.alternativePhone && "Please provide number to be used for notification"}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <Divider variant={"fullWidth"} sx={{ my: 2}}>
                            <DMTChip label={'Proof of Damage'} color={'warning'}/>
                        </Divider>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTCatureImage
                            label={'Damaged Device Image'}
                            name={'damagedPhoneImage'}
                            onBlur={formik.handleBlur}
                            format={ALLOWED_DOCUMENTS.accept}
                            value={formik.values.damagedPhoneImage}
                            placeholder={"Take / Upload Photo"}
                            error={Boolean(formik.touched.damagedPhoneImage && formik.errors.damagedPhoneImage)}
                            helperText={formik.touched.damagedPhoneImage && formik.errors.damagedPhoneImage}
                            onChange={value => formik.setFieldValue('damagedPhoneImage', value)}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTCatureImage
                            label={'IMEI Number Image'}
                            name={'imeiNumberImage'}
                            format={ALLOWED_DOCUMENTS.accept}
                            onBlur={formik.handleBlur}
                            value={formik.values.imeiNumberImage}
                            placeholder={"Take / Upload Photo"}
                            error={Boolean(formik.touched.imeiNumberImage && formik.errors.imeiNumberImage)}
                            helperText={formik.touched.imeiNumberImage && formik.errors.imeiNumberImage}
                            onChange={value => formik.setFieldValue('imeiNumberImage', value)}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                </Grid>


                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt:2}}>
                    <SaveLaterButton
                        values={formik.values}
                        claimType={claimsTypes.DAMAGE.value}
                        customerDetails={customerDetails}
                        handleOnReset={handleOnReset}
                        savedClaim={savedClaim}
                    />
                    <Button color={'primary'} variant={'contained'} type={'submit'}>
                        {"Submit Claim"}
                    </Button>
                </Box>
            </Box>
            </Scrollbar>
            <ConfirmationDialog
                open={openDialog}
                claim={ formik.values }
                customer={customerDetails}
                onProceed={handleOnProceed}
                onClose={handleOnClose}

            />
        </>
    )
}

export default DamageForm;