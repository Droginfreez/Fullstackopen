import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      const {message, type} = action.payload
      return {
        message: message,
        type: type
      }
    }
  }
})

export const {setNotification} = notificationSlice.actions

let timeoutId

export const createNotification = (message, time, type) => {
  return (dispatch) => {
    dispatch(setNotification({message, type}))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(setNotification(initialState))
    }, time * 1000)
  }
}

export default notificationSlice.reducer