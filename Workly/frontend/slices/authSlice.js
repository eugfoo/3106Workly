import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action) {
            const { user, token } = action.payload;
            // Store a flat object with token and user info
            state.userInfo = { ...user, token };
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
        logout(state) {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
