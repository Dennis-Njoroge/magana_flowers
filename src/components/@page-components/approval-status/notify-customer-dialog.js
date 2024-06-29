import DMTDialog from "@/components/@shared-components/dialog";
import {alpha, Box, Collapse, DialogContent, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import PropertyItem from "@/components/@shared-components/list/property-item";
import Button from "@mui/material/Button";
import SuccessPage from "@/components/@shared-components/success-page";
import OTPInput from "react-otp-input";
import OTPCountdown from "@/hocs/otp-countdown";
import {useFormik} from "formik";
import * as Yup from "yup";
import {claimsApis} from "@/services/claims-apis";
import {useAuth} from "@/hooks/use-auth";
import {toast} from "react-toastify";



const NotifyCustomerDialog = props => {
    const { open, onClose, claim, onProceed } = props;
    const [isSuccess, setIsSuccess] = useState(null);
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnProceed = async () => {
        setIsLoading(true);
        try{
            const formData = {
                claimId: claim?.id?.toString(),
                shopId: user?.shoptype,
                userId: user?.userid,
            }

            const res = await claimsApis.notifyCustomer(formData);
            if (res?.success){
                setIsSuccess(true);
            }
            else{
                toast.error('An error occurred while processing request. Please try again later')
            }
        }
        catch (e) {
            console.log(e)
        }
        setIsLoading(false);

    }

    useEffect(() => {
        if(open){
            setIsSuccess(null);
        }
    },[open, claim])

    return (
        <>
            <DMTDialog
                open={open}
                onClose={onClose}
            >
                <DialogContent sx={{ display: 'flex', gap:1, flexDirection: 'column'}}>
                    <Collapse in={Boolean(isSuccess === null)}>
                        <Typography variant={'h5'} color={'primary'} gutterBottom>
                            {"Notify Customer"}
                        </Typography>
                        <Typography sx={{ my: 2}}>
                            {"Please note that a notification will be sent to the customer for collection of device."}
                        </Typography>
                        <Button disabled={isLoading} variant={'contained'} onClick={handleOnProceed} color={'primary'}>
                            {isLoading ? "Sending..." : "Send Notification"}
                        </Button>
                    </Collapse>
                    <Collapse in={Boolean(isSuccess)}>
                        {Boolean(isSuccess) && (
                            <>
                                <SuccessPage  message={"Notification has been sent to the customer successfully!"} onContinue={onClose} label={'Ok'}/>
                            </>
                        )}
                    </Collapse>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default NotifyCustomerDialog;