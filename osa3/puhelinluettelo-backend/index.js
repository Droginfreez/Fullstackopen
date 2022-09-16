require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./modules/persons')
morgan.token('content', (req) => {
  if (req.method === 'POST') return JSON.stringify(req.body)
  return null
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.use(express.static('build'))

app.use(cors())

app.use(express.json())

app.get('/api/persons', (request, response) => {
  Person.find({}).then((results) => {
    response.json(results.map((person) => person.toJSON()))
  })
})


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person.toJSON())
    } else {
      response.status(404).end()
    }
  })
    .catch((error) => next (error))

})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'no name' })
  }
  function randomId(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const random = randomId(5, 100)
  const person = new Person({
    id: random,
    name: body.name,
    number: body.number
  })

  person.save()
    .then((savedPerson) => {
      response.json(savedPerson.toJSON())
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response) => {
  var today = new Date()
  Person.find({}).then((people) => {
    response.send(`Phonebook has ${people.length} people <br/>${today}`)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.message.includes('ObjectId')) {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)