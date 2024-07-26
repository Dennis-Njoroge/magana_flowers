import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BusinessDetailsCard from "@/components/@page-components/dashboard/business-details-card";
import WelcomeBoard from "@/components/@page-components/dashboard/welcome-board";
import DiscountedProducts from "@/components/@page-components/dashboard/discounted-products";
import ProductCategories from "@/components/@page-components/dashboard/product-categories";
import {useAuth} from "@/hooks/use-auth";
import {USER_TYPES} from "@/utils/constants";
import Users from "@/components/@page-components/users";
import {Typography} from "@mui/material";
import AdminDashboard from "@/components/@page-components/dashboard/admin-dashboard";
import Order from "@/components/@page-components/order";

const Dashboard = () => {
    const { user } = useAuth();
    if (user?.userType === USER_TYPES.ADMIN){
        return  <AdminDashboard/>
    }
    return(
        <>
            <Box>
                <Grid container spacing={{ md: 4, sm:2, xs:2 }}>
                    <Grid item xs={12} md={9} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} sm={12}>
                                <WelcomeBoard/>
                            </Grid>
                            {user?.userType === USER_TYPES.CUSTOMER ? (
                                <>
                                    <Grid item xs={12} md={12} sm={12}>
                                        <ProductCategories/>
                                    </Grid>
                                    <Grid item xs={12} md={12} sm={12}>
                                        <DiscountedProducts/>
                                    </Grid>
                                </>
                            ): (
                                <Grid item xs={12} md={12} sm={12}>
                                    <Order fixed={false}/>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                        <BusinessDetailsCard/>
                    </Grid>
                    <Grid></Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Dashboard;