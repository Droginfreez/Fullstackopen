import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({loginHandler, username, setUsername, password, setPassword}) => (
    <form onSubmit={loginHandler}>
      <div>
        username
          <input id='username' type='text' value={username} name='Username'
            onChange={({target}) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input id='password' type='password' value={password} name='Password'
            onChange={({target}) => setPassword(target.value)}
          />
      </div>
      <button id='loginButton' type='submit'>login</button>
    </form>
  )

  LoginForm.propTypes = {
    loginHandler: PropTypes.func.isRequired,
    username: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.string.isRequired
  }

  export default LoginForm