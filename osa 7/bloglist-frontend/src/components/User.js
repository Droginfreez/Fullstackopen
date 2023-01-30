import {useParams} from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((n) => n.id === id)

  if (!user) {
    return null
  }
  return (
    <div>
      <h3>{user.name}</h3>
      <p>
        <b>added blogs</b>
      </p>
      {user.blogs.map((blog) => (
        <ul key={blog.id}>
          <li>{blog.title}</li>
        </ul>
      ))}
    </div>
  )
}

export default User