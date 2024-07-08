import {createSlice} from "@reduxjs/toolkit";
import {productsApis} from "@/services/products";
import {setIsLoading} from "@/redux/slices/loading";
import {getAutoCompleteValue} from "@/utils/helper-functions";
import {categoriesApis} from "@/services/categories";

const initialState = {
    products: [],
    discountedProducts: [],
    categories: [],
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
        setCategories: (state, action) => {
            state.categories = action.payload
        }
    }
});

const {
    setProducts,
    setDiscountedProducts,
    setCategories
} = ProductsSlice.actions;


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

export const getCategories = () => async dispatch => {
    try{
        const res = await categoriesApis.fetchCategories();
        dispatch(setCategories(res));
    }
    catch (e) {
        console.log(e.message)
    }
}

export default ProductsSlice.reducer;


