import {useRef} from 'react'
import {useDispatch} from 'react-redux'
import {addBlog} from '../reducers/blogReducer'
import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'

const NewBlog = ({notify}) => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const createBlog = async (blog) => {
    dispatch(addBlog(blog))
      .then(() => {
        notify(`blog '${blog.title}' by ${blog.author} added`)
        blogFormRef.current.toggleVisibility()
      }).catch((error) => {
        notify('NewBlog error: ' + error.response.data.error, 'alert')
      })
  }

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>
    </div>
  )
}

export default NewBlog