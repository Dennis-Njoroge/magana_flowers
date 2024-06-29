import {createSlice} from "@reduxjs/toolkit";
import {claimsData, dispatchedData} from "@/utils/dummy-data/general-data";
import {claimsApis} from "@/services/claims-apis";

const initialState = {
    claims: [...claimsData],
    dispatchedClaims: [],
    damagedParts: []
}

const ClaimsSlice = createSlice({
    name: "claims",
    initialState,
    reducers:{
        setClaims: (state, action) => {
            state.claims = action.payload
        },
        setDispatchedClaims: (state, action) => {
            state.dispatchedClaims = action.payload
        },
        setDamageParts: (state, action) => {
            state.damagedParts = action.payload
        },

    }
});

const { setClaims, setDispatchedClaims, setDamageParts } = ClaimsSlice.actions;


export const getDamagedParts = values => async dispatch => {
    try{
        const res = await claimsApis.fetchDeviceParts(values);
        dispatch(setDamageParts(res));
    }
    catch (e) {
        console.log(e.message);
    }
}

export default ClaimsSlice.reducer;


