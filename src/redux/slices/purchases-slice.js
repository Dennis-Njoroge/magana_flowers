import {createSlice} from "@reduxjs/toolkit";
import {purchasesApis} from "@/services/purchases";
import {setIsLoading} from "@/redux/slices/loading";

const initialState = {
    purchases: [],
    payments: [],
    purchaseStatus: null,
}

const PurchasesSlice = createSlice({
    name: "purchases",
    initialState,
    reducers:{
        setPurchaseStatus: (state, action) => {
            state.purchaseStatus = action.payload
        },
        setPayments: (state, action) => {
          state.payments = action.payload;
        },
        setPurchases: (state, action) => {
            state.purchases = action.payload;
        },
    }
});

export const {
    setPurchases,
    setPurchaseStatus,
    setPayments
} = PurchasesSlice.actions;

export const getAllPurchases = (filters) => async dispatch => {
    dispatch(setIsLoading(true));
    try{
        const res = await purchasesApis.fetchPurchases(filters);
        dispatch(setPurchases(res.data));
    }
    catch (e) {
        console.log(e.message)
    }
    finally {
        dispatch(setIsLoading(false))
    }
}

export const getAllPaidPurchases = () => async dispatch => {
    dispatch(setIsLoading(true));
    try{
        const res = await purchasesApis.fetchPurchases({ payment_status: 'PAID'});
        dispatch(setPayments(res.data));
    }
    catch (e) {
        console.log(e.message)
    }
    finally {
        dispatch(setIsLoading(false))
    }
}



export default PurchasesSlice.reducer;


