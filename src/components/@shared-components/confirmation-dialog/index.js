import DMTDialog from "@/components/@shared-components/dialog";
import {alpha, Box, Collapse, DialogActions, DialogContent, Typography} from "@mui/material";
import PropertyItem from "@/components/@shared-components/list/property-item";
import Button from "@mui/material/Button";
import {formatCurrency, getAutoCompleteValue, getMaskedName} from "@/utils/helper-functions";
import {useEffect, useState} from "react";
import SuccessPage from "@/components/@shared-components/success-page";
import {useRouter} from "next/router";
import {claimsTypes} from "@/utils/constants";

const ConfirmationDialog = props => {
    const { open, onClose, claim, customer, onProceed } = props;
    const [isSuccess, setIsSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const selectedDevice = getAutoCompleteValue(customer?.phones, claim.phoneId);

    const handleOnProceed = async () => {
        setIsLoading(true)
        const res = await onProceed();
        if (res){
            setIsSuccess(true);
        }
        setIsLoading(false);
    }

    const handleOnContinue = () => {
        router.push('/dashboard/claims-status')
        onClose?.();
    }

    const formatCustomerName = (value ) => {
        if (claim?.claimType === claimsTypes.DAMAGE.value){
            return getMaskedName(value);
        }
        return value;
    }


    useEffect(() => {
        if(open){
            setIsSuccess(null);
        }
    },[open])


    return (
        <>
            <DMTDialog
                open={open}
                onClose={onClose}
            >
                <DialogContent sx={{ display: 'flex', gap:1, flexDirection: 'column'}}>
                    <Collapse in={Boolean(isSuccess === null)}>
                        <Typography variant={'h5'} color={'primary'} gutterBottom>
                            {"Confirmation"}
                        </Typography>
                        <Typography>
                            {"By submitting this claim, you confirm that the claim is compliant with Sanlam Claims Submission Policy."}
                        </Typography>
                        <Box sx={{  backgroundColor: theme => alpha(theme.palette.primary.main, 0.1), p:2, borderRadius: 2}}>
                            <PropertyItem label={"Customer Name"} value={formatCustomerName(customer?.customerName)}/>
                            <PropertyItem label={"Claim Type"} value={claim?.claimType}/>
                            <PropertyItem label={"Device IMEI"} value={selectedDevice?.imeiNumber}/>
                            <PropertyItem label={"Total Cost"} value={formatCurrency(claim?.totalCost )}/>
                        </Box>
                        <DialogActions>
                            <Button variant={'contained'} onClick={handleOnProceed} disabled={isLoading} color={'primary'}>
                                {isLoading? "Submitting..." : "Yes, Proceed "}
                            </Button>
                        </DialogActions>
                    </Collapse>
                    <Collapse in={Boolean(isSuccess)}>
                        {Boolean(isSuccess) && (
                            <>
                                <SuccessPage success={true}  message={"Claim has been submitted successfully!"} onContinue={handleOnContinue}/>
                            </>
                        )}
                    </Collapse>


                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default ConfirmationDialog;