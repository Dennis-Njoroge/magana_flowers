import {useRef, useState} from "react";
import Button from "@mui/material/Button";
import {DialogContent, DialogTitle, Icon} from "@mui/material";
import DMTDialog from "@/components/@shared-components/dialog";
import {orderApis} from "@/services/order";

const DownloadReceiptButton = ({ order }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const pdfViewerRef = useRef();
    const [receipt, setReceipt] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const onDownloadReceipt = async () => {
        setIsLoading(true);
        try{
           const res = await orderApis.generateReceipt({id: order?.id});
           if (res.success){
               const { fileUrl, fileName } = res;
               const downloadLink = document.createElement('a');
               downloadLink.href = fileUrl;
               downloadLink.download = fileName;
               document.body.appendChild(downloadLink);
               await downloadLink.click();
               document.body.removeChild(downloadLink);
           }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsLoading(false)
        }

    }
    return (
        <>
            <Button
                variant={'text'}
                onClick={onDownloadReceipt}
                startIcon={<Icon>download</Icon>}
                disabled={isLoading}
            >
                {isLoading? "Downloading..." : "Download Receipt"}
            </Button>
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
                fullScreen={true}
            >
                <DialogTitle>
                    {"Preview Receipt"}
                </DialogTitle>
                <DialogContent>
                    <div style={{ height: '90vh' }}>
                        <iframe src={receipt}  style={{ width: '100%', height: '100%' }} />
                    </div>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default DownloadReceiptButton;