import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import employeeReducer from "./slices/employeeSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Persist configurations
const userPersistConfig = {
  key: "user",
  storage,
};

const employeePersistConfig = {
  key: "employee",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedEmployeeReducer = persistReducer(
  employeePersistConfig,
  employeeReducer
);
const rootReducer = combineReducers({
  user: persistedUserReducer,
  employee: persistedEmployeeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
//Purge persisted state
//persistor.purge();
persistor.subscribe(() => {
  const state = store.getState();
  console.log("Persisted State:", state);
});
