import {useFormik} from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import {sanitizeString} from "@/utils/helper-functions";
import DMTCurrencyInput from "@/components/@shared-components/forms/currency-input";
import DMTDatePicker from "@/components/@shared-components/date-picker";
import {useEffect, useState} from "react";
import DMTSelectDevice from "@/components/@shared-components/forms/select-device";
import Button from "@mui/material/Button";
import {Alert, Divider, useMediaQuery} from "@mui/material";
import DMTChip from "@/components/@shared-components/chip";
import DMTCatureImage from "@/components/@shared-components/forms/camera";
import {Scrollbar} from "@/components/@shared-components/scrollbar";
import * as Yup from 'yup';
import ConfirmationDialog from "@/components/@shared-components/confirmation-dialog";
import {claimsTypes} from "@/utils/constants";

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

const CreditLifeForm = ({ customerDetails, resetCustomerDetails }) => {
    const [selectedDevices, setSelectedDevices] = useState([]);
    const [openDialog, setOpenDialog ] = useState(false);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    const initialValues =  {
        phoneId: "",
        loanBalance: "",
        loanRefNo: "",
        incidentDate: "",
        narration: "",
        claimType: claimsTypes.CREDIT_LIFE.value,
        deathCertificateImage: null,
        submit: null,
    };

    const validationSchema = Yup.object({
        phoneId: Yup.string().required("Please select device").nullable(),
        loanBalance: Yup.string().required("Loan balance is required!"),
        loanRefNo: Yup.string().required("Loan reference number is required!"),
        narration: Yup.string().required("Narration is required!"),
        incidentDate: Yup.date().required("Please select Date!"),
        deathCertificateImage: Yup.object().nullable().test('type',ALLOWED_DOCUMENTS.error, checkIfValid),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try{
                //TODO: make api to submit claim
                setOpenDialog(true);

            }
            catch (e) {
                console.log(e.message);
            }
        }
    });

    const handleOnProceed = async () => {
        formik.resetForm();
        resetCustomerDetails();
    }

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const handleSanitizeInput = (name, value) => {
        formik.setFieldValue(name, sanitizeString(value));
    }

    useEffect(() => {
        setSelectedDevices(customerDetails?.phones ?? []);
    },[customerDetails]);


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
                        <DMTSelectDevice
                            options={selectedDevices}
                            label={'Device'}
                            name={'phoneId'}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneId}
                            placeholder={"-- Choose  Device --"}
                            error={Boolean(formik.touched.phoneId && formik.errors.phoneId)}
                            helperText={formik.touched.phoneId && formik.errors.phoneId}
                            onChange={values => handleSanitizeInput('phoneId', values?.phoneId ?? "")}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTDatePicker
                            label={'Date of Incident'}
                            name={'incidentDate'}
                            onBlur={formik.handleBlur}
                            value={formik.values.incidentDate}
                            error={Boolean(formik.touched.incidentDate && formik.errors.incidentDate)}
                            helperText={formik.touched.incidentDate && formik.errors.incidentDate}
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
                            label={'Loan Balance'}
                            name={'loanBalance'}
                            onBlur={formik.handleBlur}
                            value={formik.values.loanBalance}
                            error={Boolean(formik.touched.loanBalance && formik.errors.loanBalance)}
                            helperText={formik.touched.loanBalance && formik.errors.loanBalance}
                            onChange={(values) => handleSanitizeInput('loanBalance', values.value)}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTTextInput
                            label={'Loan Reference Number'}
                            name={'loanRefNo'}
                            value={formik.values.loanRefNo}
                            error={Boolean(formik.touched.loanRefNo && formik.errors.loanRefNo)}
                            onBlur={formik.handleBlur}
                            helperText={formik.touched.loanRefNo && formik.errors.loanRefNo}
                            onChange={e => handleSanitizeInput("loanRefNo", e.target.value)}
                            defaultInput={false}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <Divider variant={"fullWidth"} sx={{ my: 2}}>
                            <DMTChip label={'Proof of Death'} color={'warning'}/>
                        </Divider>
                    </Grid>
                    <Grid item xs={12} md={12} sm={12}>
                        <DMTCatureImage
                            label={'Death Certificate Image'}
                            name={'deathCertificateImage'}
                            onBlur={formik.handleBlur}
                            format={ALLOWED_DOCUMENTS.accept}
                            value={formik.values.deathCertificateImage}
                            placeholder={"Take / Upload Photo"}
                            error={Boolean(formik.touched.deathCertificateImage && formik.errors.deathCertificateImage)}
                            helperText={formik.touched.deathCertificateImage && formik.errors.deathCertificateImage}
                            onChange={value => formik.setFieldValue('deathCertificateImage', value)}
                            fullWidth={true}
                            required={true}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt:2}}>
                    <Button color={'secondary'} variant={'contained'} disabled={true}>
                        {"Save for Later"}
                    </Button>
                    <Button color={'primary'} variant={'contained'} type={'submit'}>
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

export default CreditLifeForm;