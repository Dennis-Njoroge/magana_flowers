import ClaimsSlice from "@/redux/slices/dashboard/claims-slice";
import LoadingSlice from "@/redux/slices/loading";
import ProductsSlice from "@/redux/slices/products-slice";

const reducers = {
    claims: ClaimsSlice,
    loading: LoadingSlice,
    products:  ProductsSlice
}


export default reducers;