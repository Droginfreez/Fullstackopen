import Blog from './Blog'


const Bloglist = ({blogs, user, likeBlog, removeBlog}) => {

  const x = (a, b) =>
    b.likes - a.likes || a.title.localeCompare(b.title)
  const sortedBlogs = [...blogs].sort(x)

  return (
    <div>
      <div id='blogs'>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
            />
        ))}
      </div>     
    </div>
  )
}

export default Bloglist