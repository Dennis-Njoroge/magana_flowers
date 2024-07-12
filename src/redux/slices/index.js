import ClaimsSlice from "@/redux/slices/dashboard/claims-slice";
import LoadingSlice from "@/redux/slices/loading";
import ProductsSlice from "@/redux/slices/products-slice";
import cartSlice from "@/redux/slices/cart-slice";

const reducers = {
    claims: ClaimsSlice,
    loading: LoadingSlice,
    products:  ProductsSlice,
    cart: cartSlice
}


export default reducers;