import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DiscountedProducts from "@/components/@page-components/dashboard/discounted-products";
import ProductCategories from "@/components/@page-components/dashboard/product-categories";

const Shop = () => {
    return(
        <>
            <Box>
                <Grid container spacing={{ md: 4, sm:2, xs:2 }}>
                    <Grid item xs={12} md={9} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} sm={12}>
                                <ProductCategories/>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <DiscountedProducts/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                    </Grid>
                    <Grid></Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Shop;