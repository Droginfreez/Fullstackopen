import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import Blogs from './components/Blogs'
import {initializeUser} from './reducers/userReducer'
import {createNotification} from './reducers/notificationReducer'
import loginService from './services/loginService'
import {loginUser} from './reducers/userReducer'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const user = useSelector(({user}) => {
    return user
  })

  const notification = useSelector(({notification}) => {
    return notification
  })

  const notify = (message, type) => {
    const time = 3
    dispatch(createNotification(message, time, type))
  }

  const login = async (username, password) => {
    loginService
      .login({username, password})
      .then((user) => {
        dispatch(loginUser(user))
        notify(`${user.name} logged in`)
      }).catch(() => {
        notify('wrong username/password', 'alert')
      })
  }

  const loginView = () => {
    return (
      <div>
        <LoginForm onLogin={login} />
      </div>
    )
  }

  const blogAppView = () => {
    return (
      <div>
        <Blogs user={user} notification={notification} notify={notify} />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Notification notification={notification} />
        {user === null ? loginView() : blogAppView()}
      </div>
    </Router>
  )
}

export default App