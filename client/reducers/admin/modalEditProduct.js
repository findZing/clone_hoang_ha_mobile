import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    hasBeen: false,
    product: {}
}

const modalEditProductSlice = createSlice({
    name: 'modaleditproduct',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload.open,
            state.hasBeen = action.payload.hasBeen,
            state.product = action.payload.product
        }
    }
})

export const {setOpen} = modalEditProductSlice.actions

export default modalEditProductSlice.reducer