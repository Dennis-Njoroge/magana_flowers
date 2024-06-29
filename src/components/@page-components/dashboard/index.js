import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BusinessDetailsCard from "@/components/@page-components/dashboard/business-details-card";
import WelcomeBoard from "@/components/@page-components/dashboard/welcome-board";
import RecentClaims from "@/components/@page-components/dashboard/recent-claims";
import RecentDispatched from "@/components/@page-components/dashboard/recent-dispatched";

const Dashboard = () => {
    return(
        <>
            <Box>
                <Grid container spacing={{ md: 4, sm:2, xs:2 }}>
                    <Grid item xs={12} md={8} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} sm={12}>
                                <WelcomeBoard/>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <RecentClaims/>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <RecentDispatched/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} sm={12}>
                        <BusinessDetailsCard/>
                    </Grid>

                </Grid>
            </Box>
        </>
    )
}

export default Dashboard;