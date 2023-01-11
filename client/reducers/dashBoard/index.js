import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedTabIndex: 0,

}

export const dashBoardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setSelectedTabIndex: (state, action) => {
            state.selectedTabIndex = action.payload.tab
        }
    }

})

export const {setSelectedTabIndex} = dashBoardSlice.actions

export default dashBoardSlice.reducer