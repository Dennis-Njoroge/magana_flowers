import {alpha, Toolbar, Tooltip, Typography, useMediaQuery} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/styles";
import {drawerWidth} from "./index";
import MuiAppBar from '@mui/material/AppBar';
import AccountButton from "@/components/@shared-components/buttons/account-button";
import {
    MdMenu as MenuIcon,
    MdMenuOpen as MenuOpenIcon
} from "react-icons/md";
import Box from "@mui/material/Box";
import GlobalSearchInput from "@/components/@layouts/modern-layout/global-search-input";
import NotificationBadge from "@/components/@layouts/modern-layout/notification-badge";
import CartCountIcon from "@/components/@layouts/modern-layout/cart-count-icon";


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    backgroundColor: alpha(theme.palette.background.paper, 0.6),
    backdropFilter: 'blur(8px)',
    ...(theme.palette.mode === "light"
        ? {
            boxShadow: theme.shadows[0],
        }
        : {
            backgroundColor: theme.palette.background.paper,
            borderBottomColor: theme.palette.divider,
            borderBottomStyle: "solid",
            borderBottomWidth: 1,
            boxShadow: "none",
        }),
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            //easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const ModernNavbar = props => {
    const {open, handleDrawerOpen, title = ""} = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });
    return (
        <>
            <AppBar position="fixed" open={open}>
                <Toolbar sx={{height: '80px', color: 'text.primary'}}>
                    <Tooltip title = {open ? "Minimize" : "Expand"}>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            color={'inherit'}
                            // sx={{ ml: -10, }}
                        >
                            {open ? <MenuOpenIcon/> : <MenuIcon/>}
                        </IconButton>
                    </Tooltip>
                    <Typography variant={'h6'}>
                        {title}
                    </Typography>
                    {/*{lgUp && (*/}
                    {/*    <>*/}
                    {/*        <Box sx={{flex: '1 0 auto'}}/>*/}
                    {/*        <GlobalSearchInput/>*/}
                    {/*    </>*/}
                    {/*)}*/}

                    <Box sx={{flex: '1 0 auto'}}/>
                    {/*<NotificationBadge/>*/}
                    <CartCountIcon/>
                    <AccountButton/>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default ModernNavbar;