import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProfileCard from "@/components/@page-components/my-account/profile-card";
import AccountMenuItem from "@/components/@page-components/my-account/account-menu-item";
import {Typography} from "@mui/material";
import {useState} from "react";
import ActionMenuDialog from "@/components/@page-components/my-account/action-menu-dialog";

const menus = [
    {
        id: 1,
        name: 'Change Password',
        description: 'Update your password from here',
        link: '#change-password',
        icon: 'lock_reset'
    },
    {
        id: 4,
        name: 'Frequently Asked Questions',
        description: 'Any questions? Check this out',
        link: '#faqs',
        icon: 'quiz'
    },
    {
        id: 2,
        name: 'Contact Us',
        link: '#contact-us',
        description: 'Glad to hear from you.',
        icon: 'contact_support'
    },
    {
        id: 3,
        name: 'About Us',
        description: 'Learn more about us',
        link: '#about-us',
        icon: 'travel_explore'
    },
]

const MyAccount = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const handleOnOpen = (menu) => {
        setOpenDialog(true);
        setSelectedMenu(menu);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3}></Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap:2}}>
                        <ProfileCard/>
                        <Typography sx={{ mt:1}} variant={'subtitle1'}>
                            {"More Actions"}
                        </Typography>
                        {menus.map(menu => (
                            <AccountMenuItem key={menu.name} item={menu} onSelect={handleOnOpen}/>
                        ))}
                    </Box>
                </Grid>
            </Grid>
            <ActionMenuDialog
                open={openDialog}
                onClose={handleOnClose}
                action={selectedMenu}
            />
        </>
    )
}

export default MyAccount;