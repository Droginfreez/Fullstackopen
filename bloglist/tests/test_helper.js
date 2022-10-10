const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "init blog #1",
    author: "test",
    url: "test.com",
    likes: 1,
    id: "632960f5472b216b9b4c8d61"
  },
  {
    title: "init blog #2",
    author: "boss",
    url: "boss.com",
    likes: 2,
    id: "632960f5472b216b9b4c8d62"
  }
]

const confBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}
const confUsers = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {confBlogs, confUsers, initialBlogs}