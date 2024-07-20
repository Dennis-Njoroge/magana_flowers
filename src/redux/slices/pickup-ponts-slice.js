import {createSlice} from "@reduxjs/toolkit";
import {pickUpPointsApis} from "@/services/pick-up-points";

const initialState = {
    pickupPoints: [],
}

const PickUpPointSlice = createSlice({
    name: "pick-point",
    initialState,
    reducers:{
        setPickupPoints: (state, action) => {
            state.pickupPoints = action.payload;
        },
    }
});

export const {
    setPickupPoints,
} = PickUpPointSlice.actions;

export const getPickupPoints = (filters) => async dispatch => {
    try{
        const res = await pickUpPointsApis.fetchPickPoints(filters);
        dispatch(setPickupPoints(res));
    }
    catch (e) {
        console.log(e.message)
    }
}

export default PickUpPointSlice.reducer;


