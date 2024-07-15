import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartProducts: [
        {
            id: 1,
            prod_id: 1,
            image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            prod_name: 'Rose Flower',
            prod_price: 200,
            qty: 4,
        },
        {
            id: 2,
            prod_id: 2,
            image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            prod_name: 'Rose Flower II',
            prod_price: 250,
            qty: 2,
        },
        {
            id: 3,
            prod_id: 1,
            image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            prod_name: 'Rose Flower III',
            prod_price: 1000,
            qty: 2,
        },
    ],
    cartCount: 4
}

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        setCartProducts: (state, action) => {
            state.cartProducts = action.payload
        },
    }
});

const {
    setCartProducts,
} = CartSlice.actions;

export const getCartProducts = () => async dispatch => {
    try{
    }
    catch (e) {
        console.log(e.message)
    }
}

export default CartSlice.reducer;


