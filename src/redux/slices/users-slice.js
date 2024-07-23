import {createSlice} from "@reduxjs/toolkit";
import {pickUpPointsApis} from "@/services/pick-up-points";
import {usersApis} from "@/services/users";
import {USER_TYPES} from "@/utils/constants";
import {setIsLoading} from "@/redux/slices/loading";

const initialState = {
    drivers: [],
    users: [],
    customers: [],
    employees: [],
}

const Users = createSlice({
    name: "users",
    initialState,
    reducers:{
        setDrivers: (state, action) => {
            state.drivers = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
        setEmployees: (state, action) => {
            state.employees = action.payload;
        },
    }
});

export const {
    setDrivers,
    setUsers,
    setCustomers,
    setEmployees,
} = Users.actions;

export const getDrivers = () => async dispatch => {
    try{
        const filters = {
            user_type: USER_TYPES.DRIVER
        }
        const res = await usersApis.fetchUsers(filters);
        dispatch(setDrivers(res));
    }
    catch (e) {
        console.log(e.message)
    }
}

export const getUsers = () => async dispatch => {
    dispatch(setIsLoading(true))
    try{
        const filters = {}
        const res = await usersApis.fetchUsers(filters);
        const customers = res?.filter(user => user.user_type === USER_TYPES.CUSTOMER);
        const employees = res?.filter(user => user.user_type !== USER_TYPES.CUSTOMER);
        dispatch(setCustomers(customers))
        dispatch(setEmployees(employees))
        dispatch(setUsers(res));

    }
    catch (e) {
        console.log(e.message)
    }
    dispatch(setIsLoading(false))
}



export default Users.reducer;


