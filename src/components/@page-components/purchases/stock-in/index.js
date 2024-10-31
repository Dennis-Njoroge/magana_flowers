import StockInForm from "@/components/@page-components/purchases/stock-in/stock-in-form";
import {DialogContent, DialogTitle} from "@mui/material";
import DMTDialog from "@/components/@shared-components/dialog";
import Button from "@mui/material/Button";
import {purchasesApis} from "@/services/purchases";
import {toast} from "react-toastify";
import {useState} from "react";

const StockIn = ({ label= 'Stock In', product}) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOnOpen = () => {
        setOpenDialog(true);
    }

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const handleOnSave = async values => {
        try{
            const formData = {
                supplier_id: values.supplierId,
                original_qty: Number(values.originalQty),
                prod_id: Number(product.prod_id),
                price_per_unit: Number(values.pricePerUnit),
                description: values.description,
                available_qty: Number(values.originalQty),
                final_price_per_unit: Number(values.pricePerUnit),
            }

            const res = await purchasesApis.createPurchases(formData);
            toast.success(res?.message);
            handleOnClose();
        }
        catch (e) {
            console.log(e.message)
        }
    }

    return (
        <>
            <Button variant={'contained'} onClick={handleOnOpen} >
                {label}
            </Button>
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogTitle>
                    {label}
                </DialogTitle>
                <DialogContent>
                    <StockInForm
                        product={product}
                        onSave={handleOnSave}
                    />
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default StockIn;