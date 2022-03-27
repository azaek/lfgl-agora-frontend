import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    walletAddress: "",
    lastLogin: "",
    token: "",
    lensProfileConnected: false,
    lensProfile_id: 0
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.walletAddress = action.payload.walletAddress;
            state.lastLogin = action.payload.lastLogin;
            state.token = action.payload.token;
            state.lensProfileConnected = action.payload.lensProfileConnected;
            state.lensProfile_id = action.payload.lensProfile_id;
        },
        clearUser: (state) => {
            state.walletAddress = "";
            state.lastLogin = "";
            state.token = "";
            lensProfileConnected = false;
            lensProfile_id = 0;
        },
        updateLens: (state, action) => {
            state.lensProfileConnected = action.payload.lensProfileConnected;
            state.lensProfile_id = action.payload.lensProfile_id;
        }
    }
});

export const { setUser, clearUser, updateLens } = userSlice.actions;
export default userSlice.reducer;