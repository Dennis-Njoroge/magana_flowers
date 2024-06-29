import {useRef, useState} from "react";
import {ClickAwayListener, Grow, Icon, MenuItem, MenuList, Paper, Popper} from "@mui/material";
import DispatchServiceDialog from "@/components/@page-components/approval-status/dispatch-service-dialog";
import NotifyCustomerDialog from "@/components/@page-components/approval-status/notify-customer-dialog";
import Button from "@mui/material/Button";
import {
    MdOutlineExpandMore as ExpandMore
} from "react-icons/md";
import DMTChip from "@/components/@shared-components/chip";

const ActionMenus = props => {
    const { claim, onRefresh } = props;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const [openDispatchDialog, setOpenDispatchDialog] = useState(false);
    const [openNotificationDialog, setOpenNotificationDialog] = useState(false);

    const handleOnOpenDispatchDialog = () => {
        setOpenDispatchDialog(true);
    }

    const handleOnCloseDispatchDialog = async () => {
        setOpenDispatchDialog(false);
        await onRefresh?.();
    }

    const handleOnOpenNotificationDialog = () => {
        setOpenNotificationDialog(true);
    }

    const handleOnCloseNotificationDialog = () => {
        setOpenNotificationDialog(false);
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

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    const color = claim.dispatched ? 'success' :  'warning';

    return (
        <>
            <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={!claim.dispatched ? handleToggle : e => console.log()  }
                title={'More Actions'}
                endIcon={!claim.dispatched && <ExpandMore/>}
                disableRipple={claim.dispatched}
                variant={'outlined'}
                color={color}
            >
                {!claim?.dispatched ? 'Pending' :  'Dispatched'}
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
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleOnOpenDispatchDialog} >Dispatch Service</MenuItem>
                                    <MenuItem onClick={handleOnOpenNotificationDialog}>Notify Customer</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
            <DispatchServiceDialog claim={claim} onRefresh={onRefresh} open={openDispatchDialog} onClose={handleOnCloseDispatchDialog}/>
            <NotifyCustomerDialog claim={claim} open={openNotificationDialog} onClose={handleOnCloseNotificationDialog}/>
        </>
    )
}

export default ActionMenus;