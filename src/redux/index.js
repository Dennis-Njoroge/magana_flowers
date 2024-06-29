import {configureStore} from "@reduxjs/toolkit";
import reducers from "@/redux/slices";

export const store = configureStore({
    reducer: {...reducers},
    middleware:  getDefaultMiddleware =>
        getDefaultMiddleware({
                serializableCheck: false,
            }
        ),
})