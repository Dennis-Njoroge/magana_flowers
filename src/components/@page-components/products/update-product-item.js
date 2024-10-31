import {alpha, Avatar, Paper, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CreateUpdateProduct from "@/components/@page-components/products/create-update-product";
import {formatCurrency} from "@/utils/helper-functions";
import StockIn from "@/components/@page-components/purchases/stock-in";

const UpdateProductItem = ({ product, onRefresh }) => {
    const formattedPrice = () => {
        return formatCurrency(product.discounted_price);
    }
    return (
        <Grid container spacing={2} component={Paper} sx={{ mt:1, pb:2,}} alignItems={'center'}>
            <Grid item xs={7} sm={7} md={7} sx={{display: 'flex', flexDirection:' row', gap:2 }} >
                <Avatar
                    src={product?.image}
                    variant={'square'}
                    sx={{
                        width: 50,
                        height: 50,
                        color: 'text.primary',
                        backgroundColor: theme => alpha(theme.palette.info.main, 0.1),
                    }}
                />
                <Box>
                    <Typography variant={'body1'} fontWeight={'bold'}>
                        {product.prod_name}
                    </Typography>
                    <Typography variant={'caption'}>
                        {`X ${product?.qty} @`}
                        {formattedPrice()}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={5} sm={5} md={5} sx={{ display: 'flex', gap:1, alignItems: 'flex-end', justifyContent: 'center',  flexDirection: 'column'}}>
                <CreateUpdateProduct
                    product={product}
                    onRefresh={onRefresh}
                />
                <StockIn
                    product={product}
                />
            </Grid>
        </Grid>
    )
}
export default UpdateProductItem;