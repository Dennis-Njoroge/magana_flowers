import {useRef, useState} from "react";
import {alpha, Avatar, ButtonBase, Typography, useMediaQuery} from "@mui/material";
import Box from "@mui/material/Box";
import {AccountPopover} from "@/components/@shared-components/buttons/account-popover";
import {useAuth} from "@/hooks/use-auth";
import {getInitials} from "@/utils/helper-functions";
import {
    MdOutlineExpandMore as ExpandMore
} from "react-icons/md";

const AccountButton = () => {
    const anchorRef = useRef(null);
    const [openPopover, setOpenPopover] = useState(false);
    const { user } = useAuth();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    const handleOpenPopover = () => {
        setOpenPopover(true);
    };

    const handleClosePopover = () => {
        setOpenPopover(false);
    };


    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    ml: 4,
                }}
            >
                <Avatar
                    sx={{
                        height: 40,
                        width: 40,
                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                        color: 'primary.main',
                    }}
                >
                    {/*{getInitials(user?.name)}*/}
                </Avatar>
                {lgUp && (
                    <>
                        <Typography sx={{ mx: 2, fontWeight:'bold' }} variant={'body2'} >
                            {user?.username}
                            <br/>
                            <Typography variant={'caption'}>
                                ({user?.userType?.toUpperCase()})
                            </Typography>
                        </Typography>

                        <ExpandMore/>
                    </>
                )}
            </Box>
            <AccountPopover
                anchorEl={anchorRef.current}
                onClose={handleClosePopover}
                open={openPopover}
            />
        </>
    );
};

export default AccountButton;