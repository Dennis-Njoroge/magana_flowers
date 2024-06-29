import Button from "@mui/material/Button";
import {useState} from "react";
import {claimsApis} from "@/services/claims-apis";
import {DialogActions, DialogContent, Typography} from "@mui/material";
import DMTDialog from "@/components/@shared-components/dialog";
import {useAuth} from "@/hooks/use-auth";
import {toast} from "react-toastify";

const SaveLaterButton = ({ savedClaim, values, customerDetails, handleOnReset, claimType }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const handleOnClose = () => {
       setOpenDialog(false);
    }
    const handleOnOpen = () => {
        setOpenDialog(true);
    }

    const handleOnSave = async () => {
        const partsIds = values?.damagedPart?.map(obj => obj.id);
        setIsLoading(true)
        try{
            const formData = {
                partnerCode: user?.PartnerCode,
                customerName: customerDetails?.customerName,
                phoneId: values.phoneId,
                idNumber: customerDetails.idNumber,
                claimType: claimType,
                partid: partsIds,
                partCost: values.damagePartCost,
                replacementCost: values.totalCost,
                incidentDate: values.incidentDate ?? "",
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
                id: savedClaim?.id ?? 0
            }
            const res = await claimsApis.saveForLater(formData);
            if (res.success){
                toast.success('Claim has been saved successfully!')
                handleOnClose?.();
                handleOnReset?.();
            }
            else{
                toast.error(res?.errorMsg ?? "An error occurred while processing request!")
            }
        }
        catch (e) {
            toast.error("An error occurred while processing request!")
        }
        setIsLoading(false)
    }

    return (
        <>
            <Button variant={'outlined'} onClick={handleOnOpen}>
                {"Save for Later"}
            </Button>
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogContent sx={{ display: 'flex', gap:1, flexDirection: 'column'}}>
                    <Typography variant={'h5'} color={'primary'} gutterBottom>
                        {"Confirmation"}
                    </Typography>
                    <Typography>
                        {"Are you sure you want to save this claim?"}
                    </Typography>
                    <DialogActions>
                        <Button variant={'contained'} onClick={handleOnSave} disabled={isLoading} color={'primary'}>
                            {isLoading? "Submitting..." : "Yes, Proceed "}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default SaveLaterButton;