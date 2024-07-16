import Button from "@mui/material/Button";
import {Icon} from "@mui/material";
import {useState} from "react";
import ConfirmationDialog from "@/components/@shared-components/confirmation-dialog";
import {useDispatch} from "react-redux";
import {useAuth} from "@/hooks/use-auth";
import {clearCart} from "@/redux/slices/cart-slice";

const ClearCartButton = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    const { user } = useAuth();

    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }
    const handleOnProceed = async () => {
        const values = {
            userId: user.id
        };
        dispatch(clearCart(values));
        handleOnClose();
    }
    return (
        <>
            <Button
                variant={'text'}
                startIcon={<Icon>clear</Icon>}
                onClick={handleOnOpen}
            >
                {"Clear All"}
            </Button>
            <ConfirmationDialog
                open={openDialog}
                onClose={handleOnClose}
                onProceed={handleOnProceed}
            />
        </>
    )
}

export default ClearCartButton;