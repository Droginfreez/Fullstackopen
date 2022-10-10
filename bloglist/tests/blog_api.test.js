const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const config = require("../utils/config");

const Blog = require("../models/blog")
const User = require("../models/user")
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe(' when blogs already exist', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map((blog) => blog.id)
    for (const id of ids) {expect(id).toBeDefined()}
  })
})

describe('adding a new blog', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("boss", 10)
    const user = await new User({ username: "boss", passwordHash }).save()

    const userForToken = {username: "boss", id: user.id}
    token = jwt.sign(userForToken, config.SECRET)

    return token
  })

  test('blogs can be added', async () => {
    const newBlog = {
      title: 'yes',
      author: 'a',
      url: 'https://www.test.com',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const blogs = await helper.confBlogs()
      const titles = blogs.map((blog) => blog.title)
      expect(titles).toContain('yes')
  })

  test(' likes = 0 if missing', async () => {
    const newBlog = {
      title: 'ok',
      author: 'ok',
      url: 'https://www.test.com'
    }

    await api
      .post('/api/blogs')
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.confBlogs()
    expect(blogs[blogs.length - 1].likes).toBe(0)
  })

  test(' decline requests with missing data', async () => {
    const newBlog = {likes: 1}
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('removing a blog', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("boss", 10)
    const user = await new User({ username: "boss", passwordHash }).save()

    const userForToken = {username: "boss", id: user.id}
    token = jwt.sign(userForToken, config.SECRET)

    const newBlog = {
      title: "to be deleted",
      author: "boss",
      url: "boss.com"
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    return token
  })

  test('deleting a blog succeeds', async () => {
    const blogs = await api.get('/api/blogs')
    const target = blogs.body[0]

    await api
      .delete(`/api/blogs/${target.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)
    expect(blogs.body).not.toContain(target.id)
  })
})

describe('updating a blog', () => {
  test('updating a blog succeeds', async () => {
    const blogs = await api.get('/api/blogs')
    const target = blogs.body[0]

    await api
    .put(`/api/blogs/${target.id}`)
     .send({likes: 10})
      .expect(200)

    const blogsAtEnd = await helper.confBlogs()
    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.likes).toBe(10)
  })
})

afterAll(() => {
  mongoose.connection.close()
})