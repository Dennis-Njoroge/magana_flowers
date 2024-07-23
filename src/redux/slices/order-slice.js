import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {orderApis} from "@/services/order";
import {setIsLoading} from "@/redux/slices/loading";

const initialState = {
    orders: [],
    orderStatus: null,
}

const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{
        setOrderStatus: (state, action) => {
            state.orderStatus = action.payload
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
    }
});

export const {
    setOrders,
    setOrderStatus
} = OrderSlice.actions;

export const getAllOrders = (filters) => async dispatch => {
    dispatch(setIsLoading(true));
    try{
        const res = await orderApis.fetchOrders(filters);
        dispatch(setOrders(res.data));
    }
    catch (e) {
        console.log(e.message)
    }
    finally {
        dispatch(setIsLoading(false))
    }
}
export const updateOrderStatus = (values, driverId = null) => async dispatch => {
    try{
        const res = await orderApis.updateOrderStatus(values, driverId);
        toast.success(res?.message);
    }
    catch (e) {
        console.log(e.message)
    }
}


export default OrderSlice.reducer;

