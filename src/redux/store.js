import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Use localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import counterReducer from "./slices/counterSlice.js";

// Redux Persist Config
const persistConfig = {
  key: "root",
  storage,
};

// Combine Reducers
const rootReducer = combineReducers({
  counter: counterReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Fixes non-serializable values warning
    }),
});

// Persistor
export const persistor = persistStore(store);
