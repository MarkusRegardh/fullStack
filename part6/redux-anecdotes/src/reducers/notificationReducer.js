import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        set(state, action) {
            return action.payload
        },
        unset(state,action) {
            return ''
        }
    }
})

export const {set, unset} = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, time) => {
    return async dispatch => {
      dispatch(set(message))
      setTimeout(() => {
        dispatch(unset())
      }, time*1000)
    }
  }