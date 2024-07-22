import {alpha, Avatar, Card, Typography} from "@mui/material";
import {useAuth} from "@/hooks/use-auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ProfileCard =() => {
    const { user } = useAuth();
    return (
        <Card
            sx={{
                p:2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                //flexDirection: 'column',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText'
        }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
                <Avatar
                    sx={{
                        height: 50,
                        width: 50,
                        // backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                        color: 'inherit',
                    }}
                >
                    {/*{getInitials(user?.name)}*/}
                </Avatar>
                <Box>
                    <Typography variant={'h6'}>
                        {user?.username}
                    </Typography>
                    <Typography variant={'caption'}>
                        {user?.userType?.toUpperCase()} ACCOUNT
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Button size={'small'} variant={'outlined'} sx={{ color: 'inherit', borderColor: 'inherit'}}>
                    {'Edit Profile'}
                </Button>
            </Box>
        </Card>
    )
}

export default ProfileCard;