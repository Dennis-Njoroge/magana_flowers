import Box from "@mui/material/Box";
import {Divider, Typography} from "@mui/material";
import {formatDate, purchaseStatusColor} from "@/utils/helper-functions";
import PropertyItem from "@/components/@shared-components/list/property-item";
import DMTChip from "@/components/@shared-components/chip";
import {useState} from "react";
import PurchasePreviewDialog from "@/components/@page-components/purchases/purchase-preview-dialog";

const PurchaseItem = ({ purchase, onRefresh }) => {
    const color = purchaseStatusColor(purchase?.status);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <Box
                onClick={handleOnOpen}
                sx={{
                backgroundColor: 'background.paper',
                p:2,
                borderTop: 4,
                borderColor: `${color}.main`,
                '&:hover':{
                    cursor: 'pointer'
                },
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography>
                        {"Purchase No: "}
                        {purchase?.purchase_no}
                    </Typography>
                    <Typography variant={'caption'}>
                        {formatDate(purchase?.create_on, 'DD/MM/YYYY HH:mm a')}
                    </Typography>
                </Box>
                <Divider sx={{ my:1 }}/>
                <PropertyItem
                    label={'Supplier Name'}
                    value={purchase?.User?.username}
                />
                <PropertyItem
                    label={'Product Name'}
                    value={purchase?.Product?.prod_name}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <PropertyItem
                        label={'Status'}
                        value={purchase?.payment_status}
                    />
                    <PropertyItem
                        value={<DMTChip label={purchase?.status} color={color}/>}
                    />
                </Box>
            </Box>
            <PurchasePreviewDialog
                open={openDialog}
                onClose={handleOnClose}
                purchase={purchase}
                onRefresh={onRefresh}
            />
        </>
    )
}

export default PurchaseItem;