import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
}

const SettingsSlice = createSlice({
    name: "loading",
    initialState,
    reducers:{
        setIsLoading : (state, action) => {
            state.isLoading = action.payload
        },
    }
});

export const { setIsLoading} = SettingsSlice.actions;


export default SettingsSlice.reducer;


