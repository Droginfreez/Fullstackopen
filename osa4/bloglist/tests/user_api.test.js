const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

  beforeEach(async () => {
    await User.deleteMany({})

  })

  test('fails, username shorter than 3', async () => {
    const usersAtStart = await helper.confUsers()

    const newUser = {
      username: 'a',
      name: 'test',
      password: 'test'
    }

    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toContain('username & password must be ≥ 3 characters')
    const usersAtEnd = await helper.confUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails, password shorter than 3', async () => {
    const usersAtStart = await helper.confUsers()

    const newUser = {
      username: 'test',
      name: 'test',
      password: 'a'
    }

    const result = await api.post('/api/users').send(newUser).expect(400)
    expect(result.body.error).toContain('username & password must be ≥ 3 characters')
    const usersAtEnd = await helper.confUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

afterAll(() => {
  mongoose.connection.close()
})