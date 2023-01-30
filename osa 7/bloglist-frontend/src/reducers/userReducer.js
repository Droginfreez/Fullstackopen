import {createSlice} from '@reduxjs/toolkit'
import userService from '../services/userService'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      return user
    }
  }
})

export const {setUser} = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const user = await userService.getUser()
    dispatch(setUser(user))
  }
}

export const loginUser = (user) => {
  return async (dispatch) => {
    userService.setUser(user)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    userService.clearUser()
    dispatch(setUser(null))
  }
}

export default userSlice.reducer