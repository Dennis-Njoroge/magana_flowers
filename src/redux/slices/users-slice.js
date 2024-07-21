import {createSlice} from "@reduxjs/toolkit";
import {pickUpPointsApis} from "@/services/pick-up-points";
import {usersApis} from "@/services/users";

const initialState = {
    drivers: [],
}

const Users = createSlice({
    name: "users",
    initialState,
    reducers:{
        setDrivers: (state, action) => {
            state.drivers = action.payload;
        },
    }
});

export const {
    setDrivers,
} = Users.actions;

export const getDrivers = () => async dispatch => {
    try{
        const filters = {
            user_type: 'driver'
        }
        const res = await usersApis.fetchUsers(filters);
        dispatch(setDrivers(res));
    }
    catch (e) {
        console.log(e.message)
    }
}

export default Users.reducer;


