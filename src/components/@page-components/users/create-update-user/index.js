import Button from "@mui/material/Button";
import {useState} from "react";
import DMTDialog from "@/components/@shared-components/dialog";
import {DialogContent, DialogTitle, MenuItem} from "@mui/material";
import UserForm from "@/components/@page-components/users/create-update-user/user_form";
import {usersApis} from "@/services/users";
import {toast} from "react-toastify";

const CreateUpdateUser = ({ label, user, userType, onClose, onRefresh }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOnOpen = () => {
        setOpenDialog(true);
    }

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const handleOnSave = async values => {
        try{
            let res;
            const formData = {
                id: user?.id ?? null,
                first_name: values.firstName,
                last_name: values.lastName,
                username: `${values.firstName} ${values.lastName}`,
                phone_no: values.phoneNumber,
                user_type: values.userType,
                status: 'active',
                email: values.email,
                password: user? values.password : null
            }
            if (user){
                res = await usersApis.updateUser(formData)
            }
            else{
                res = await usersApis.addUser(formData);
            }

            if (res.success){
                toast.success(res?.message);
                handleOnClose();
                await onRefresh?.();
                onClose?.();

            }
        }
        catch (e) {
            console.log(e.message)
        }
    }

    return (
        <>
            {Boolean(user) ? (
                <MenuItem onClick={handleOnOpen}>
                    {label}
                </MenuItem>
            ) : (
                <Button variant={'contained'} onClick={handleOnOpen} >
                    {label}
                </Button>
            )}

            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
               <DialogTitle>
                   {label}
               </DialogTitle>
                <DialogContent>
                    <UserForm
                        user={user}
                        userType={userType}
                        onSave={handleOnSave}

                    />
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default CreateUpdateUser;