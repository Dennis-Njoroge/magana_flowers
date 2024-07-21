import {useState} from "react";
import Button from "@mui/material/Button";
import ConfirmationDialog from "@/components/@shared-components/confirmation-dialog";
import {ORDER_STATUS} from "@/utils/constants";
import {orderApis} from "@/services/order";
import {toast} from "react-toastify";

const OrderActionButton = ({ status, label,order, onClose, ...others }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const getMessage = () => {
        let ACTION = 'Are you sure ';
        if (status === ORDER_STATUS.APPROVED){
            ACTION += `you want to  approve order -${order?.order_no}?`;
        }
        if (status === ORDER_STATUS.COMPLETED){
            ACTION += 'you want to confirm the order delivery?';
        }
        if (status === ORDER_STATUS.DISPATCHED){
            ACTION += `you want to dispatch order ${order?.order_no}? Please assign a driver`;
        }
        if (status === ORDER_STATUS.CANCELED){
            ACTION += `you want to cancel order ${order?.order_no}? This action cannot be undone`;
        }
        if (status === ORDER_STATUS.DELIVERED){
            ACTION += `you have delivered order ${order?.order_no} ?`
        }
        return ACTION;
    }

    const handleOnProceed = async (driverId) => {
        try{
            const values = {
                status: status,
                id: order.id
            }
            const res = await orderApis.updateOrderStatus(values, driverId);
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
                showForm={status === ORDER_STATUS.DISPATCHED}
            />
        </>
    )
}

export default OrderActionButton;