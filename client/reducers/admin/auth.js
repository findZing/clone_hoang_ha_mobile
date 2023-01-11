import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

import axiosConfig from "../../axiosConfig";

const initialState = {
    token: '',
    loginOrNot: true,

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            // console.log(action.payload.token)
            state.token = action.payload.token
        },
        setRefreshToken: (state, action) => {
            const cookies = new Cookies()
            cookies.set('refreshToken', action.payload.refreshToken, {
                // httpOnly: true,
                secure: true,
                path: '/',
                samSite: "strict"
            })
        },
        setLoginOrNot: (state, action) => {
            state.loginOrNot = action.payload.loginOrNot
        },
        setLogOut: (state) => {
            state.token = ''
        },
        setRequestRefresh: async (state, action) => {

        }
    },
    
})

export const {setToken, setRefreshToken, setLoginOrNot, setLogOut, setRequestRefresh} = authSlice.actions

export default authSlice.reducer