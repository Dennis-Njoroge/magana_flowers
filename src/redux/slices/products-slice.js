import {createSlice} from "@reduxjs/toolkit";
import {productsApis} from "@/services/products";
import {setIsLoading} from "@/redux/slices/loading";
import {getAutoCompleteValue} from "@/utils/helper-functions";

const initialState = {
    products: [],
    discountedProducts: [],
}

const ProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setDiscountedProducts: (state, action) => {
            state.discountedProducts = action.payload
        },
    }
});

const { setProducts, setDiscountedProducts } = ProductsSlice.actions;


export const getAllProducts = filters => async dispatch => {
    dispatch(setIsLoading(true));
    try{
        const res = await productsApis.fetchProducts(filters);
        dispatch(setProducts(res));
        const discountedProducts = res.filter(prod => prod.discount !== 0);
        dispatch(setDiscountedProducts(discountedProducts));
    }
    catch (e) {
        console.log(e.message);
    }
    dispatch(setIsLoading(false))
}

export default ProductsSlice.reducer;


