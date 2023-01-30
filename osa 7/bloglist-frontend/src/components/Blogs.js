import {Routes, Route, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'

import User from './User'
import Userlist from './Userlist'
import Blogview from './Blogview'
import BlogDetails from './BlogDetails'
import {logoutUser} from '../reducers/userReducer'
import {initializeUsers} from '../reducers/usersReducer'
import {initializeBlogs, addLikeToBlog, deleteBlog} from '../reducers/blogReducer'

const Blogs = ({ user, notify, notification }) => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  const showLoggedUser = () => (
    <div>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  )

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(({users}) => {
    return users
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(({blogs}) => {
    return blogs
  })

  const likeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    const likedBlog = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user.id
    }

    dispatch(addLikeToBlog(likedBlog)).then(() => {
      notify(`liked '${likedBlog.title}' by ${likedBlog.author}`)
    })
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }

    dispatch(deleteBlog(id)).then(() => {
      notify('blog was removed')
    })
  }

  const padding = {padding: 5}
  return (
    <div>
      <div>
        <Link style={padding} to='/'>
          Blogs
        </Link>
        <Link style={padding} to='/users'>
          Users
        </Link>
      </div>
      <div> {showLoggedUser()}</div>

      <Routes>
        <Route path='/' element={            
          <Blogview
            blogs={blogs}
            notify={notify}
            notification={notification}
            user={user}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
          />
        }/>
        <Route path='/users/' element={<Userlist users={users} />} />
        <Route path='/users/:id' element={<User users={users} />} />
        <Route path='/blogs/:id' element={
          <BlogDetails
            blogs={blogs}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        }/>
      </Routes>
    </div>
  )
}

export default Blogs