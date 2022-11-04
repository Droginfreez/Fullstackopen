import React, {useState}  from 'react'

const BlogForm = ({createBlog}) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const titleHandler  = (event) => {
    setBlogTitle(event.target.value)
  } 
  const authorHandler = (event) => {
    setBlogAuthor(event.target.value)
  }
  const urlHandler = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        likes: 0
      })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:{' '}
        <input
        id='title'
        value={blogTitle} 
        onChange={titleHandler} 
        placeholder='Title'
        className='title'/>
      </div>
      <div>
        Author:{' '}
        <input
        id='author'
        value={blogAuthor} 
        onChange={authorHandler} 
        placeholder='Author'
        className='author'/>
        </div>
      <div>
        Url:{' '}
        <input
        id='url'
        value={blogUrl} 
        onChange={urlHandler} 
        placeholder='Url'
        className='url'/>
        </div>
      <div><button id ='blogButton' type='submit'>add</button></div>
    </form>
  )
}

export default BlogForm