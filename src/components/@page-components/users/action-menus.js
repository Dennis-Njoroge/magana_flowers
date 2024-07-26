import {useRef, useState} from "react";
import {ClickAwayListener, Grow,  MenuItem, MenuList, Paper, Popper} from "@mui/material";
import Button from "@mui/material/Button";
import {
    MdOutlineExpandMore as ExpandMore
} from "react-icons/md";
import {usersApis} from "@/services/users";
import {toast} from "react-toastify";
import {PASSWORD_ACTIONS} from "@/utils/constants";
import ConfirmationDialog from "@/components/@shared-components/confirmation-dialog";
import CreateUpdateUser from "@/components/@page-components/users/create-update-user";


const UserActionMenus = props => {
    const { user, onRefresh } = props;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [options, setOptions] = useState({
        message: '',
        onProceed: null,
    })

    const accountStatus = user?.status === 'active' ?  'Deactivate' : 'Activate' ;

    const handleOnOpenDialog = (action) => {
        let message;
        let onProceed = null;
        if (action === 'reset'){
            message = 'Are you sure you want to reset password?';
            onProceed = handleOnResetPassword
        }
        if (action === 'approve'){
            message = `Are you sure you want to ${accountStatus} account?`;
            onProceed = handleOnApproveDisableUser;
        }
        setOptions({
            message,
            onProceed
        });
        setOpenDialog(true);
    }

    const handleOnCloseDialog = () => {
        setOpenDialog(false);
    }


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    // const handleListKeyDown = (event) => {
    //     if (event.key === 'Tab') {
    //         event.preventDefault();
    //         setOpen(false);
    //     } else if (event.key === 'Escape') {
    //         setOpen(false);
    //     }
    // }

    const handleOnApproveDisableUser = async () => {
        try{
            const values = {
                id: user?.id,
                status: user?.status === 'active' ? 'inactive' : 'active'
            }
            const res = await usersApis.approveUser(values);
            if (res.success){
                toast.success(res?.message);
                handleOnCloseDialog();
                await onRefresh()
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }
    const handleOnResetPassword = async () => {
        try{
            const values = {
                action: PASSWORD_ACTIONS.RESET,
                email: user?.email,
            }
            const res = await usersApis.changePassword(values);
            if (res.success){
                toast.success('Password has been reset successfully!');
                handleOnCloseDialog();
                await onRefresh()
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }


    return (
        <>
            <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                title={'More Actions'}
                endIcon={<ExpandMore/>}
                variant={'outlined'}
            >
                {'Action'}
            </Button>

            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                // disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            {/*<ClickAwayListener onClickAway={handleClose}>*/}
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    //onKeyDown={handleListKeyDown}
                                >
                                    <CreateUpdateUser user={user} label={'Update'} onClose={handleClose} onRefresh={onRefresh}/>
                                    <MenuItem onClick={() => handleOnOpenDialog ('approve')} >
                                        {accountStatus} Account
                                    </MenuItem>
                                    <MenuItem onClick={() => handleOnOpenDialog ('reset')} >Reset Password</MenuItem>
                                </MenuList>
                            {/*</ClickAwayListener>*/}
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <ConfirmationDialog
                open={openDialog}
                onClose={handleOnCloseDialog}
                message={options.message}
                onProceed={options.onProceed}
            />
        </>
    )
}

export default UserActionMenus;