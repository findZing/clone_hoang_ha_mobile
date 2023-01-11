import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import authReducer from './admin/auth'
import appReducer from './app'
import dashBoardReducer from "./dashBoard";
import modalEditProductReducer from "./admin/modalEditProduct";
import navbarReducer from "./navbar"

// const reducers = combineReducers({
//     auth: authReducer,
//     app: appReducer,
//     dashboard: dashBoardReducer
// })

const persistConfigAuth = {
    key: 'root',
    storage,
    whitelist: ['token'],
    // whitelist: ['loginOrNot']
}


const persistConfigNavbar = {
    key: 'second',
    storage,
    whitelist: ['amountProduct','amountTotal'],
    // whitelist: ['loginOrNot']
}

const persistedReducerAuth = persistReducer(persistConfigAuth, authReducer)
const persistedReducerNavbar = persistReducer(persistConfigNavbar, navbarReducer)

export const store = configureStore({
    reducer: combineReducers({
        auth: persistedReducerAuth,
        app: appReducer,
        dashboard: dashBoardReducer,
        modaleditproduct: modalEditProductReducer,
        navbar: persistedReducerNavbar
    }),
    middleware: [thunk]
})