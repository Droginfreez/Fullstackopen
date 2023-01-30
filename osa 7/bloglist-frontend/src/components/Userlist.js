import {Link} from 'react-router-dom'

const Userlist = ({users}) => {
  const countBlogs = (user) => {
    return user.blogs.length
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link> </td>
              <td>{countBlogs(user)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Userlist