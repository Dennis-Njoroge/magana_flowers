import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BusinessDetailsCard from "@/components/@page-components/dashboard/business-details-card";
import WelcomeBoard from "@/components/@page-components/dashboard/welcome-board";
import DiscountedProducts from "@/components/@page-components/dashboard/discounted-products";
import ProductCategories from "@/components/@page-components/dashboard/product-categories";

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
                                <ProductCategories/>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <DiscountedProducts/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} sm={12}>
                        <BusinessDetailsCard/>
                    </Grid>
                    <Grid></Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Dashboard;