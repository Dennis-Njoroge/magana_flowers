import {formatCurrency} from "@/utils/helper-functions";
import Grid from "@mui/material/Grid";
import {alpha, Avatar, Typography} from "@mui/material";
import Box from "@mui/material/Box";

const PurchaseProductItem = ({ product }) => {

    const formattedPrice = () => {
        return formatCurrency(product?.price);
    }
    return (
        <>
            <Grid container spacing={2} sx={{ pb:1, pr:2}} alignItems={'center'}>
                <Grid item xs={6} sm={12} md={12} sx={{display: 'flex', flexDirection:' row', gap:2 }} >
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
                        <Typography variant={'body2'} fontWeight={'bold'}>
                            {product?.prod_name}
                        </Typography>
                        <Typography variant={'caption'}>
                            {`Available Qty ${product?.qty} @`}
                            {formattedPrice()}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}


export default PurchaseProductItem