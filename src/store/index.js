import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";

const persistUserConfig = {
    key: 'persistUser',
    storage
}

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedUserReducer
    }
})

export const persistor = persistStore(store);

export default store;
