import DMTDialog from "@/components/@shared-components/dialog";
import {Collapse, DialogActions, DialogContent, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import DMTDriversSelect from "@/components/@shared-components/forms/select-drivers";
import DMTTextInput from "@/components/@shared-components/forms/text-input";


const ConfirmationDialog = props => {
    const { open, isPurchase= false, onClose, onProceed, message= 'Are you sure you want to clear cart?', showForm } = props;
    const [isSuccess, setIsSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [driverId, setDriverId] = useState(null);

    const hasError = Boolean(isPurchase && showForm && driverId?.length !== 10);
    const handleOnProceed = async e => {
        e.preventDefault();
        if (hasError){
            return;
        }
        setIsLoading(true)
        const res = await onProceed(driverId);
        if (res){
            setIsSuccess(true);
        }
        setIsLoading(false);
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
                fullScreen={false}
            >
                <DialogContent sx={{ display: 'flex', gap:1, alignItems: 'center', flexDirection: 'column'}}>
                    <Typography variant={'h5'} color={'primary'} gutterBottom>
                        {"Confirmation"}
                    </Typography>
                    <Typography align={'center'}>
                        {message}
                    </Typography>
                    <Box component={'form'} onSubmit={handleOnProceed}>
                        {showForm && (
                            <>
                                {isPurchase ? (
                                    <DMTTextInput
                                        id={'transactionCode'}
                                        label={'MPESA Transaction Code'}
                                        value={driverId}
                                        required={true}
                                        onChange={e => setDriverId(e.target.value)}
                                        name={'transactionCode'}
                                        error={Boolean(hasError)}
                                        helperText={hasError ? "Transaction code should be 10 characters long" :""}
                                        placeholder={'Enter the MPESA Code'}
                                    />
                                ): (
                                    <DMTDriversSelect
                                        id={'driver_select'}
                                        label={'Select Driver'}
                                        name={'driverId'}
                                        placeholder={'-- Select Driver --'}
                                        value={driverId}
                                        required={true}
                                        fullWidth={true}
                                        onChange={values => setDriverId(values?.id)}
                                    />
                                )}

                            </>
                        )}
                        <Box sx={{ mt:2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap:2 }}>
                            <Button variant={'outlined'} onClick={onClose} disabled={isLoading} color={'primary'}>
                                {"Cancel "}
                            </Button>
                            <Button variant={'contained'} type={'submit'}  disabled={isLoading} color={'primary'}>
                                {isLoading? "Processing" : "Yes, Proceed "}
                            </Button>
                        </Box>
                    </Box>

                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default ConfirmationDialog;