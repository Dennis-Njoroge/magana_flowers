import DMTDialog from "@/components/@shared-components/dialog";
import {DialogContent, DialogTitle} from "@mui/material";
import AboutUs from "@/components/@page-components/my-account/about-us";
import ChangePassword from "@/components/@page-components/my-account/change-password";
import Faqs from "@/components/@page-components/my-account/faqs";
import ContactUs from "@/components/@page-components/my-account/contact-us";

const ActionMenuDialog = ({ action, open, onClose }) => {
    if (!action){
        return null;
    }
    return (
        <>
            <DMTDialog
                open={open}
                onClose={onClose}
            >
                <DialogTitle>
                    {action.name}
                </DialogTitle>
                <DialogContent>
                    {action.link === '#change-password' && (
                        <ChangePassword onClose={onClose}/>
                    )}
                    {action.link === '#contact-us' && (
                       <ContactUs/>
                    )}
                    {action.link === '#about-us' && (
                        <AboutUs/>
                    )}
                    {action.link === '#faqs' && (
                        <Faqs/>
                    )}
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default ActionMenuDialog;