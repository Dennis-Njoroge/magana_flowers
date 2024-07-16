import {createSlice} from "@reduxjs/toolkit";
import {cartApis} from "@/services/cart";
import {toast} from "react-toastify";

const initialState = {
    cartProducts: [],
    cartCount: 0,
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        setCartProducts: (state, action) => {
            state.cartProducts = action.payload
        },
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
        setUpdateCart: (state, action) => {
            const updatedItem = action.payload;
            let cartItems = [...state.cartProducts];
            const updatedItems = cartItems.map((item) => {
                if (updatedItem.id === item.id){
                    return {...item, prod_qty: updatedItem.prod_qty};
                }
                return  item;
            });
            console.log(updatedItems);
            state.cartProducts = updatedItems
        },
        setClearCart :state => {
            state.cartProducts = initialState.cartProducts;
            state.cartCount = initialState.cartCount;
        }
    }
});

const {
    setCartProducts,
    setCartCount,
    setUpdateCart,
    setClearCart

} = CartSlice.actions;

export const getCartProducts = (filters) => async dispatch => {
    try{
        const res = await cartApis.fetchCarts(filters);
        dispatch(setCartProducts(res.data));
        dispatch(setCartCount(res?.count));
    }
    catch (e) {
        console.log(e.message)
    }
}
export const addToCart = (values) => async dispatch => {
    try{
        const res = await cartApis.createCart(values);
        dispatch(setUpdateCart(res?.cart));
        dispatch(setCartCount(res?.count));
        toast.success(res?.message);
    }
    catch (e) {
        console.log(e.message)
    }
}


export const updateCart = (values) => async dispatch => {
    try{
        const res = await cartApis.updateCart(values);
        dispatch(setUpdateCart(res?.cart));
        dispatch(setCartCount(res?.count));
        //toast.success(res?.message);
    }
    catch (e) {
        console.log(e.message)
    }
}

export const removeItemFromCart = values => async dispatch => {
    try{
        await cartApis.removeItemFromCart(values);
        await dispatch(getCartProducts({ userId: values?.userId}))
    }
    catch (e) {

    }
}
export const clearCart = (values) => async dispatch => {
    try {
        await cartApis.clearCart(values);
        dispatch(setClearCart());
    }
    catch (e) {

    }
}

export default CartSlice.reducer;


