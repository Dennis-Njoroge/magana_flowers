import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProfileCard from "@/components/@page-components/my-account/profile-card";
import AccountMenuItem from "@/components/@page-components/my-account/account-menu-item";
import {Typography} from "@mui/material";

const menus = [
    {
        id: 1,
        name: 'Change Password',
        description: 'Update your password from here',
        link: '/dashboard/change-password',
        icon: 'lock_reset'
    },
    {
        id: 1,
        name: 'Frequently Asked Questions',
        description: 'Any questions? Check this out',
        link: '/dashboard/faqs',
        icon: 'quiz'
    },
    {
        id: 2,
        name: 'Contact Us',
        link: '/dashboard/contact-us',
        description: 'Glad to hear from you.',
        icon: 'contact_support'
    },
    {
        id: 3,
        name: 'About Us',
        description: 'Learn more about us',
        link: '/dashboard/about-us',
        icon: 'travel_explore'
    },
]

const MyAccount = () => {

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
                            <AccountMenuItem key={menu.name} item={menu}/>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default MyAccount;