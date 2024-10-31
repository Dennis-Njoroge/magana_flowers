import {useState} from "react";
import Button from "@mui/material/Button";
import ConfirmationDialog from "@/components/@shared-components/confirmation-dialog";
import {PURCHASE_STATUS} from "@/utils/constants";
import {purchasesApis} from "@/services/purchases";
import {toast} from "react-toastify";

const PurchaseActionButton = ({ status, label,purchase, onClose, ...others }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const getMessage = () => {
        let ACTION = 'Are you sure ';
        if (status === PURCHASE_STATUS.APPROVED){
            ACTION += `you want to  confirm purchase -${purchase?.purchase_no}?`;
        }
        if (status === PURCHASE_STATUS.COMPLETED){
            ACTION += 'you want to proceed with the purchase payment?';
        }
        if (status === PURCHASE_STATUS.CANCELED){
            ACTION += `you want to cancel purchase ${purchase?.purchase_no}? This action cannot be undone`;
        }
        if (status === PURCHASE_STATUS.DELIVERED){
            ACTION += `you have received the purchase ${purchase?.purchase_no ?? ''} for ${purchase?.Product?.prod_name} ? This action will increment the stock by ${purchase.original_qty} units`;
        }
        return ACTION;
    }

    const handleOnProceed = async (transactionCode) => {
        try{
            let values = {
                status: status,
                id: purchase.id
            }
            if (transactionCode){
                values = {
                    ...values,
                    payment_code: transactionCode
                }
            }

            const res = await purchasesApis.updatePurchasesStatus(values);
            if (res?.success){
                onClose?.();
                toast.success(res?.message);
            }
        }
        catch (e) {
            console.log(e.message);
        }

    }

    return (
        <>
            <Button {...others} onClick={handleOnOpen}>
                {label}
            </Button>
            <ConfirmationDialog
                open={openDialog}
                onClose={handleOnClose}
                message={getMessage()}
                onProceed={handleOnProceed}
                isPurchase={true}
                showForm={status === PURCHASE_STATUS.COMPLETED}
            />
        </>
    )
}

export default PurchaseActionButton;