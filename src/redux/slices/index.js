import ClaimsSlice from "@/redux/slices/dashboard/claims-slice";
import LoadingSlice from "@/redux/slices/loading";
import ProductsSlice from "@/redux/slices/products-slice";
import cartSlice from "@/redux/slices/cart-slice";
import orderSlice from "@/redux/slices/order-slice";
import pickupPointSlice from "@/redux/slices/pickup-ponts-slice";
import usersSlice from "@/redux/slices/users-slice";

const reducers = {
    claims: ClaimsSlice,
    loading: LoadingSlice,
    products:  ProductsSlice,
    cart: cartSlice,
    order: orderSlice,
    pickupPoint: pickupPointSlice,
    users: usersSlice
}


export default reducers;