import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import employeeReducer from "./slices/employeeSlice.js";

const store = configureStore({
    reducer: {  
        user: userReducer,
        employee: employeeReducer,
    },
});
export default store;