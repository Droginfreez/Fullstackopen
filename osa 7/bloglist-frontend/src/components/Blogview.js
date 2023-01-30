import Bloglist from './Bloglist'
import NewBlog from './NewBlog'

const Blogview = ({blogs, notify, user, likeBlog, removeBlog}) => {
  return (
    <div>
      <h2>Blogs</h2>
      <NewBlog notify={notify} />
      <Bloglist
        blogs={blogs}
        user={user}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
      />
    </div>
  )
}

export default Blogview