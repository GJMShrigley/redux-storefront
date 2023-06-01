import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
            sessionStorage.setItem("login", state.isLoggedIn);
        },
        logout(state) {
            state.isLoggedIn = false;
            sessionStorage.setItem("login", state.isLoggedIn);
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;