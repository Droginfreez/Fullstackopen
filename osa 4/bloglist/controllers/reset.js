const router = require('express').Router()
const blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router