import {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import ModernNavbar from "./modern-navbar";
import ModernSidebar from "./modern-sidebar";
import Box from "@mui/material/Box";
import {useMediaQuery} from "@mui/material";

export const drawerWidth = 258;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingTop: 100,
        width:'100%',
        flexGrow: 1,
        minHeight:'100vh',
        backgroundColor: theme.palette.background.default,
        //padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('lg')]:{
            marginLeft:`-${drawerWidth}px`,
        },
        ...(open && {
            [theme.breakpoints.up('lg')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                paddingLeft: 20,
                paddingRight:20,
                paddingBottom: 20,
            },
            transition: theme.transitions.create('margin', {
                //easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const ModernLayout = props => {
    const { children, title } = props;
    const [open, setOpen] = useState(true);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });

    const handleDrawerOpen = () => {
        setOpen(prevState => !prevState);
    }
    const handleDrawerClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        setOpen(lgUp);
    },[lgUp]);

    return(
        <>
            <Box sx={{ display: 'flex' }}>
                <ModernNavbar open={open} handleDrawerOpen={handleDrawerOpen} title={title}/>
                <ModernSidebar open={open} handleDrawerClose={handleDrawerClose}/>
                <Main open={open}>
                    {children}
                </Main>
            </Box>
        </>
    )
}

export default ModernLayout;