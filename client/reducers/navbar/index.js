import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openBox: false,
    title: '',
    amountProduct: [],
    amountTotal: 0,
    openModalSearch: false,
    openMenuNavbar: false,
}

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setOpenBox: (state, action) => {
            state.openBox = action.payload.open
            state.title = action.payload.title
        },
        setOpenMenuNavbar: (state, action) => {
            state.openMenuNavbar = action.payload.open
        },
        setChangeAmountProduct: (state, action) => {
            let hasProduct = false
            if(state.amountProduct.length > 0) {
                for(let i = 0; i < state.amountProduct.length; i++){
                    if(state.amountProduct[i].product.name === action.payload.product.name){
                        state.amountProduct[i].amount += action.payload.amount
                        state.amountTotal += action.payload.amount
                        hasProduct = true
                    }
                }
            }
            if(state.amountProduct.length == 0 || !hasProduct){
                state.amountProduct.push({product: action.payload.product, amount: action.payload.amount})
                state.amountTotal += action.payload.amount
            }
        },
        setValueAmountProduct: (state, action) => {
            for (let i = 0; i < state.amountProduct.length; i++) {
                if (state.amountProduct[i].product.name === action.payload.product.name) {
                    state.amountTotal -= state.amountProduct[i].amount
                    state.amountTotal += action.payload.amount
                    state.amountProduct[i].amount = action.payload.amount
                }
            }
        },
        deleteProduct: (state, action) => {
            for (let i = 0; i < state.amountProduct.length; i++) {
                if (state.amountProduct[i].product.name === action.payload.product.name) {
                    state.amountTotal -= state.amountProduct[i].amount
                    state.amountProduct.splice(i, 1)

                }
            }
        },
        setOpenModalSearch: (state, action) => {
            state.openModalSearch = action.payload.open
        },
    }
})

export const {setOpenBox, setOpenMenuNavbar, setChangeAmountProduct, setValueAmountProduct, deleteProduct, setOpenModalSearch} = navbarSlice.actions

export default navbarSlice.reducer