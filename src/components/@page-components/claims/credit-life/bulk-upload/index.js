import {
    Box,
    Button,
    Container,
    DialogTitle,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {FileDropzone} from "@/components/@shared-components/dropzone/file-dropzone";
import DMTDialog from "@/components/@shared-components/dialog";
import {claimsApis} from "@/services/claims-apis";
import {useAuth} from "@/hooks/use-auth";
import {fileToBase64} from "@/utils/file-to-base-64";
import {toast} from "react-toastify";
import Slide from "@mui/material/Slide";
import PreviewResults from "@/components/@page-components/claims/credit-life/bulk-upload/preview-results";
import SuccessPage from "@/components/@shared-components/success-page";
import {useRouter} from "next/router";



const steps = ['Upload File', 'Preview Results'];

const BulkUpload = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { user } = useAuth();
    const router = useRouter();
    const [results, setResults] = useState(null);

    const handleOnDrop = (files) => {
        setSelectedFiles(files);
    };
    const ACCEPTED_FILES = {
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/vnd.ms-excel': ['.xls'],
        'text/csv': ['.csv'],
    };

    const handleOnRemove = (file) => {
        const newSelectedFiles = selectedFiles.filter(
            (selectedFile) => selectedFile.name !== file.name
        );
        setSelectedFiles(newSelectedFiles);
    };

    const handleOnRemoveAll = () => {
        setSelectedFiles([]);
    };

    const handleOnUpload = async () => {
        try{
            const file = selectedFiles?.[0];
            let fileDetails;
            if (file !== undefined){
                const fileExtension = '.' + file.name.split('.').pop();
                await fileToBase64(file)
                    .then(data => {
                        fileDetails = {
                            name: file.name,
                            extension: fileExtension,
                            data: data
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            const formData = {
                userId: user?.userid,
                ip: "",
                browser: "",
                fileDetails: fileDetails
            }
            const res = await claimsApis.uploadClaims(formData);
            if (res?.success) {
                setResults(res?.result);
                handleOnNext();
            }
            else{
                toast.error(res?.errorMsg ?? "Oops! An error occurred please try again.");
            }
        }
        catch (e) {
            toast.error(e?.message ?? "Oops! An error occurred please try again.");
        }
    };

    const handleOnNext = () => {
        setActiveStep(prevState => prevState + 1);
    }

    const handleOnPrev = () => {
        setActiveStep(prevState => prevState - 1)
    }


    const handleOnOpen = () => {
        setOpenDialog(true)
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const resetValues = () => {
        setActiveStep(0)
        setSelectedFiles([]);

    }

    const handleOnFinish = async () => {
        try{
            const formData = {
                id: results?.id?.toString(),
                userId: user?.userid,
            }
            //TODO: Test APIs
            const res = await claimsApis.processCreditClaims(formData);
            if (res.success){
                handleOnNext();
            }
            else
            {
                toast.error(res?.errorMsg ?? 'Oops! an error occurred while processing request')
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    const handleOnContinue = async () => {
        await router.push('/dashboard/claims-status');
    }

    useEffect(() => {
        if (openDialog && activeStep === 2){
            resetValues()
        }
    }, [openDialog])



    return (
        <Box>
            {activeStep !== 2 && (
                    <Stepper sx={{ mt: 4}} activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )
            }
            <Container sx={{ mt: 2}}>
                {activeStep === 0 && (
                    <Slide in={activeStep === 0}>
                        <Box>
                            <FileDropzone
                                accept={ACCEPTED_FILES}
                                files={selectedFiles}
                                onDrop={handleOnDrop}
                                onUpload={handleOnUpload}
                                onRemoveAll={handleOnRemoveAll}
                                onRemove={handleOnRemove}
                                maxFiles={1}
                            />
                            <Box
                                sx={{
                                    mt:4,
                                    border: '1px dashed',
                                    width: '100%',
                                    p: 2,
                                    backgroundColor: 'neutral.100',
                                    color: 'text.main'
                            }}>
                                <Typography variant={'h5'} gutterBottom>
                                    {"Getting Started with Batch Uploads?"}
                                </Typography>
                                <Typography gutterBottom>
                                    {"Upload a batch file to continue. Please note the following things before proceeding further:"}
                                </Typography>
                                <Box component={'ul'} sx={{ p:2 }} gutterBottom>
                                    <Typography component={'li'}>
                                        {"The supported file are .xls, .xlsx, .csv"}
                                    </Typography>
                                    <Typography component={'li'}>
                                        {"File should strictly adhere to the template format"}
                                    </Typography>
                                </Box>
                                <Typography component={'a'} href={'/claims/template/credit_life_claims_template.xlsx'} download color={'info.main'}>
                                    {"Download sample template file here."}
                                </Typography>
                            </Box>
                        </Box>
                    </Slide>
                )}
                {activeStep === 1 && (
                    <Slide in={activeStep === 1}>
                        <Box>
                            <PreviewResults
                                results={results}
                                onProceed={handleOnFinish}
                                onBack={handleOnPrev}
                            />
                        </Box>
                    </Slide>
                )}
                {activeStep === 2 && (
                    <Slide in={activeStep === 2}>
                        <Box>
                            <SuccessPage
                                message={"Claims submitted successfully!"}
                                onContinue={handleOnContinue}
                                fullWidth={false}
                            />
                        </Box>
                    </Slide>
                )}
            </Container>
        </Box>
    )
}

export default BulkUpload;