import React , {useState} from 'react'

const Blog = (props) => {
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const likeHandler = () => {
    const updatedBlog = ({...blog, likes: blog.likes + 1})
    console.log(`blog.js || ${blog.id} || ${updatedBlog.likes}`)
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const removeHandler = () => props.deleteBlog(blog)

  return (
    <div className='blog'>
      <div className='title'>
        <p>{blog.title} by {blog.author}<button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>url: {blog.url}</p>
        <p className='likes'>likes: {blogObject.likes} <button className='likeButton' onClick={likeHandler}>like</button></p>
        <button onClick={removeHandler}>remove</button>
      </div>
    </div> 
  ) 
}

export default Blog