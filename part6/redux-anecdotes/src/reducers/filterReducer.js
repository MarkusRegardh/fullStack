import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        update(state, action) {
            return action.payload
        }
    }
})
  
export const {update} = filterSlice.actions
export default filterSlice.reducer