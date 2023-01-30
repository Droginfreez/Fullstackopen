import {configureStore} from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    users: usersReducer,
    blogs: blogReducer,
    user: userReducer
  }
})

export default store