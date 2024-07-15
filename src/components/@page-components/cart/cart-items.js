import {useSelector} from "react-redux";
import CartItem from "@/components/@page-components/cart/cart-item";
import Box from "@mui/material/Box";
import {Divider, Icon, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {formatCurrency} from "@/utils/helper-functions";
import NextLink from "next/link";
import Checkout from "@/components/@page-components/cart/checkout";

const CartItems = () => {
    const { cartProducts, cartCount } = useSelector(({cart}) => cart);
    const [grandTotal, setGrandTotal] = useState(0);

    const formatCount = () => {
        return cartCount > 1 ? `${cartCount} Items` :  `${cartCount} Item`;
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography>
                    <b>Your Cart</b>
                    {` (${formatCount()})`}
                </Typography>
                <Button
                    variant={'text'}
                    startIcon={<Icon>clear</Icon>}
                >
                    {"Clear All"}
                </Button>
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
                    <Checkout/>
                </Box>
            </Box>

        </>
    )
}

export default CartItems;