import {useParams, useNavigate} from 'react-router-dom'
const BlogButtons = ({blog, likeBlog, removeBlog, own}) => {
  const navigate = useNavigate()

  return (
    <div>
      <div>
        <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      <div>
        {own && (
          <button onClick={() => navigate('/') || removeBlog(blog.id)}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

const BlogDetails = ({blogs, likeBlog, removeBlog, user}) => {
  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)
  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
  const own = blog.user && user.username === blog.user.username

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p><b>blog author:</b> {blog.author}</p>
      <div>
        <b> blog url:</b>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <p>blog has <b>{blog.likes}</b> likes</p>
      <p>blog was added by: <b>{addedBy}</b></p>
      <BlogButtons
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        own={own}
      />
    </div>
  )
}

export default BlogDetails