import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../redux/store";
import {LoginReduxState, UserInfo} from "../../interfaces/interfaces";

const initialState = {
    user: null
} as LoginReduxState;

const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<UserInfo>) => {
            state.user = {...action.payload}
        },
        logout: (state) => {
            state.user = null;
        }
    }
})

export default loginSlice.reducer;
export const getLoginState = (state: RootState) => state.login;
export const {loginSuccess,logout} = loginSlice.actions

