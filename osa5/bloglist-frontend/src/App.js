import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [toggle, setToggle] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = (x) => {
    try  {
      blogService.create(x).then((ret) => {
        setBlogs(blogs.concat(ret))
      })
      setMessage(`${x.title} was added`)
      setToggle(!toggle)
      setTimeout(() => {
        setMessage(null)
        setToggle(false)
      }, 3500)
    } catch (exception) {
      setMessage(`error: failed to add ${x.title}`)
      setToggle(!toggle)
      setTimeout(() => {
        setMessage(null)
        setToggle(false)
      }, 3500)
    }
  }

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`logged in as ${user.name}`)
      setToggle(!toggle)
      setTimeout(() => {
        setMessage(null)
        setToggle(false)
      }, 3500)
    } catch (exception) {
      setMessage(`error: wrong credentials`)
      setToggle(!toggle)
      setTimeout(() => {
        setMessage(null)
        setToggle(false)
      }, 3500)
    }
  }
  
  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')
    document.location.reload()
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      console.log(` app.js || ${BlogToUpdate.id} || ${BlogToUpdate.likes}`)
      const updatedBlog = await blogService.update(BlogToUpdate)
      setBlogs(blogs.map(blog => blog.id !== BlogToUpdate.id ? blog : updatedBlog))
    } catch (exception) { console.log(exception)
      setMessage(`error: failed to update likes`)
      setToggle(!toggle)
      setTimeout(() => {
        setMessage(null)
        setToggle(false)
      }, 3500)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm('Confirmation')) {await blogService.remove(blog.id)}
      setBlogs(blogs.filter((x) => x.id !== blog.id))
    } catch (exception) { console.log(exception)
      setMessage(`error: failed to delete blog`)
      setToggle(!toggle)
      setTimeout(() => {
        setMessage(null)
        setToggle(false)
      }, 3500)
    }
  }

  return (
    <div>
      <Notification message={message}/>
      {user === null ?
        <LoginForm
          loginHandler={loginHandler}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        /> :
        <div>
          <p>{user.name} logged in <button onClick={logoutHandler} type='submit'>logout</button></p>
          <Togglable buttonLabel='Add new blog'>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          <h3>Blogs</h3>
          {blogs.sort((y, x) => x.likes - y.likes).map(blog =>
            <Blog 
              key={blog.id} 
              blog={blog} 
              updateBlog={updateBlog} 
              deleteBlog={deleteBlog}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App