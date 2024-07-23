import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import WelcomeBoard from "@/components/@page-components/dashboard/welcome-board";
import {Typography} from "@mui/material";
import Users from "@/components/@page-components/users";
import BusinessDetailsCard from "@/components/@page-components/dashboard/business-details-card";

const AdminDashboard = () => {
    return (
        <>
            <>
                <Box>
                    <Grid container spacing={{ md: 4, sm:2, xs:2 }}>
                        <Grid item xs={12} md={8} sm={12}>
                            <WelcomeBoard/>
                        </Grid>
                        <Grid item xs={12} md={4} sm={12}>
                            <BusinessDetailsCard/>
                        </Grid>
                        <Grid item xs={12} md={12} sm={12}>
                            <Typography variant={'h6'} gutterBottom>
                                {"Recent Users"}
                            </Typography>
                            <Users height={'auto'}/>
                        </Grid>
                    </Grid>
                </Box>
            </>
        </>
    )
}

export default AdminDashboard;