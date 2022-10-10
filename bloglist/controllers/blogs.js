const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require("jsonwebtoken")
const middleware = require("../utils/middleware")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: "missing or invalid token"})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "missing or invalid token"})
  }

  const user = request.user
  const blog = await Blog.findById(id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    return response.status(401).json({error: "unathorized"})
  }
})

blogRouter.put('/:id', async (request, response) => {
  const user = request.user
 

  const id = request.params.id
  const likes = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(id, likes, {new: true})

  updatedBlog ? response.status(200).json(updatedBlog.toJSON()) : response.status(404).end()
})

module.exports = blogRouter