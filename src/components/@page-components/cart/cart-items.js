import {useSelector} from "react-redux";
import CartItem from "@/components/@page-components/cart/cart-item";
import Box from "@mui/material/Box";
import { Icon, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {computeGrandTotal, formatCurrency} from "@/utils/helper-functions";
import NextLink from "next/link";
import Checkout from "@/components/@page-components/cart/checkout";
import ClearCartButton from "@/components/@page-components/cart/clear-cart-button";



const CartItems = () => {
    const { cartProducts, cartCount } = useSelector(({cart}) => cart);
    const formatCount = () => {
        return cartCount > 1 ? `${cartCount} Items` :  `${cartCount} Item`;
    }

    const grandTotal = computeGrandTotal(cartProducts);



    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography>
                    <b>Your Cart</b>
                    {` (${formatCount()})`}
                </Typography>
               <ClearCartButton/>
            </Box>
            {cartProducts.map((cartProduct) => (
               <CartItem key={cartProduct.id} cartProduct={cartProduct} />
            ))}

            <Box sx={{ display: 'flex', mt:3, gap:2, alignItems: 'flex-end', flexDirection: 'column'}}>
                <Box>
                    <Typography align={'right'} variant={'h5'} >
                        {formatCurrency(grandTotal)}
                    </Typography>
                    <Typography variant={'body2'} fontWeight={'bold'}>
                        {"Total Amount"}
                    </Typography>
                </Box>

                <Box sx={{ mt:1}}>
                    <NextLink href={'/dashboard/shop'} passHref>
                        <Button sx={{ mr:2 }} variant={'outlined'}>
                            {"Continue Shopping"}
                        </Button>
                    </NextLink>
                    <Checkout totalAmount={grandTotal}/>
                </Box>
            </Box>

        </>
    )
}

export default CartItems;