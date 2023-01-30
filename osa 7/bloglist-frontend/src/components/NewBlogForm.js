import {useState} from 'react'

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({title, author, url, likes: 0})
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
        <form onSubmit={handleSubmit}>
          <div> title
            <input value={title} onChange={({target}) => setTitle(target.value)} id='title' placeholder='title'/></div>
          <div> author
            <input value={author} onChange={({target}) => setAuthor(target.value)} id='author' placeholder='author'/></div>
          <div> url
            <input value={url} onChange={({target}) => setUrl(target.value)} id='url' placeholder='url'/></div>
          <button id='create-butto' type='submit'>
            create
        </button>
      </form>
    </div>
  )
}

export default BlogForm