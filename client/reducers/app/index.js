import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    changeWidth: 0,
    changeScroll: 0,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setChangeWidth: (state, action) => {
            state.changeWidth = action.payload.width
            // console.log(action.payload.width)
        },
        setChangeScroll: (state, action) => {
            state.changeScroll = action.payload.scroll
        }
    }
})

export const {setChangeWidth, setChangeScroll} = appSlice.actions

export default appSlice.reducer