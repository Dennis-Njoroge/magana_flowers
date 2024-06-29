import {useEffect, useState} from "react";
import {claimsApis} from "@/services/claims-apis";
import {useAuth} from "@/hooks/use-auth";
import Button from "@mui/material/Button";
import DMTDialog from "@/components/@shared-components/dialog";
import {DialogContent, DialogTitle, List} from "@mui/material";
import DMTListItem from "@/components/@shared-components/list/list-item";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {maskString} from "@/utils/helper-functions";
import {toast} from "react-toastify";

const SaveForLater = ({ claimType, onSelectClaim }) => {
    const [savedClaims, setSavedClaims] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const handleOnOpen = () => {
        setOpenDialog(true);
    }

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const fetchSaved = async () => {
        setIsLoading(true);
        try{
            const formData =  {
                userId: user?.userid,
                shopId: user?.userid,
                shopType: user?.shoptype,
            }
            const res = await claimsApis.fetchSavedClaims(formData);
            if (Array.isArray(res)){
                const filtered = res.filter((claim) => claim.claimType === claimType);
                setSavedClaims(filtered);
            }
            else{
                setSavedClaims([]);
            }

        }
        catch (e) {
            console.log(e?.message);
        }
        setIsLoading(false);
    }


    const handleOnSelect = async (claim) => {
        await onSelectClaim?.(claim);
        handleOnClose();

    }

    useEffect(() => {
        if (openDialog){
            fetchSaved();
        }
    },[openDialog]);

    return (
        <>
            <Button variant={'contained'} color={'warning'} onClick={handleOnOpen}>
                {"Check Saved Claims"}
            </Button>
            <DMTDialog open={openDialog} onClose={handleOnClose}>
                <DialogTitle>
                    {"Saved Claims"}
                </DialogTitle>
                <DialogContent>
                    <List dense>
                        {savedClaims.length > 0 ? savedClaims.map( (claim, index) => (
                           <ClaimItem claim={claim} key={index} handleOnSelect={handleOnSelect}/>
                        )) : (
                            <>
                                <Typography>
                                    {isLoading ? "Loading saved claims..." : "No saved claims found!"}
                                </Typography>
                            </>
                        )}
                    </List>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

const ClaimItem = ({ claim, handleOnSelect}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClick = async () => {
        setIsLoading(true);
        try{
            const res = await claimsApis.fetchSavedClaimByID({ id: claim?.id});
            if (res){
                handleOnSelect(res);
            }
            else{
                toast.error('An error occurred while fetching details. Try again')
            }
        }
        catch (e) {
            toast.error("An error occurred while fetching details. Try again")
        }
        setIsLoading(false)
    }


    return (
        <>
            <DMTListItem
                name={claim?.customerName}
                description={`ID Number: ${maskString(claim?.idNumber, 2, -3)} | ${claim?.claimType}`}
                amount={
                    <Box>
                        <Button disabled={isLoading}  onClick={() => handleOnClick()} variant={'outlined'} color={'primary'}>
                            {isLoading ? "Loading..." : "Complete"}
                        </Button>
                    </Box>
                }
            />
        </>
    )
}

export default SaveForLater;