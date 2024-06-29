import Box from "@mui/material/Box";
import {useState} from "react";
import {Menu, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import { MdOutlineKeyboardArrowUp as ArrowUp } from "react-icons/md";

const wallets = [
    {
        name: "Test Wallet",
        value: 1,
        id: 1,
    },
    {
        name: "Test Wallet II",
        value: 2,
        id: 2,
    }
]
const SwitchWalletPopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnSwitchWallet = (wallet) => {

    }

    return(
        <>
            <Box
                component={'button'}
                sx={{
                    boxShadow: 6,
                    px:2,
                    py:1,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '250px',
                    border: 'none',
                    backgroundColor: 'background.paper',
                    color: 'neutral.500',
                    cursor: 'pointer',
                    '&:hover': {
                        boxShadow: 10,
                    },
            }}
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Typography>
                    {"Switch Wallet"}
                </Typography>
                <ArrowUp/>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {wallets.map((opt) => (
                    <MenuItem key={opt.id} onClick={ e => handleOnSwitchWallet(opt.value)}>
                         {" "} {opt.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default SwitchWalletPopover;