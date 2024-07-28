import {useState} from "react";
import Button from "@mui/material/Button";
import DMTDialog from "@/components/@shared-components/dialog";
import {DialogContent, DialogTitle} from "@mui/material";
import ProductForm from "@/components/@page-components/products/create-update-product/product-form";

const CreateUpdateProduct = ({ product, onRefresh }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const title = product ? 'Update Product' : 'Create Product';
    const handleOnOpen = () => {
        setOpenDialog(true)
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <Button onClick={handleOnOpen} variant={product? 'text' : 'contained'} color={'primary'}>
                {title}
            </Button>
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <ProductForm
                        product={product}
                        onClose={handleOnClose}
                        onRefresh={onRefresh}
                    />
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default CreateUpdateProduct;