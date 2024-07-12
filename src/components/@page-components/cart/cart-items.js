import {useSelector} from "react-redux";
import CartItem from "@/components/@page-components/cart/cart-item";

const CartItems = () => {
    const { cartProducts } = useSelector(({cart}) => cart);

    return (
        <>
            {cartProducts.map((cartProduct) => (
               <CartItem key={cartProduct.id} cartProduct={cartProduct}/>
            ))}

        </>
    )
}

export default CartItems;