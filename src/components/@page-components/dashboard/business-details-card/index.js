import {alpha, Card, CardContent, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import PropertyItem from "@/components/@shared-components/list/property-item";
import StoreLottie from "@/components/@shared-components/lottie-files/store-lottie";
import {useAuth} from "@/hooks/use-auth";

const BusinessDetailsCard = () => {
    const { user } = useAuth();
    return (
        <>
            <Card sx={{backgroundColor: theme => alpha(theme.palette.primary.main, 0.1)}}>
                <CardContent  sx={{ display:'flex', gap:1,  mt: -2, mx: -2,  alignItems: 'center'}}>
                    <Box sx={{flex: 0.5}}>
                        <StoreLottie/>
                    </Box>
                    <Box sx={{ flex: 1, display:'flex',flexDirection: 'column', gap:1}}>
                        <Typography variant={'h6'} color={'primary'}>
                            {"Business Details"}
                        </Typography>
                       <PropertyItem label={"Business Name"} value={user?.shopname}/>
                       <PropertyItem label={"Contact"} value={user?.phonenumber}/>
                       <PropertyItem label={"Location"} value={user?.location}/>
                    </Box>
                </CardContent>

            </Card>
        </>
    )
}

export default BusinessDetailsCard;