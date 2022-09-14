const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


let persons = [
  {"id": 1, "name": "Arto Hellas", "number": "040-123456"},
  {"id": 2, "name": "Ada Lovelace", "number": "39-44-5323523"},
  {"id": 3, "name": "Dan Abramov", "number": "12-43-234345"},
  {"id": 4, "name": "Mary Poppendieck", "number": "39-23-6423122"}
]
morgan.token("content", (req, res) => {
  if (req.method === "POST") return JSON.stringify(req.body)
  return null
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

app.use(express.static('build'))

app.use(cors())

app.use(express.json())

app.get('/api/people', (request, response) => {
  response.json(people)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)

if (person) {
    response.json(person)  
} else {
    response.status(404).end() 
 }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
      if (!body.name || !body.number) {
        return response.status(400).json({
          error: "no name or number"})
      }
      function randomId(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      const random = randomId(5, 100)
      const p = {
        id: random,
        name: body.name,
        phone: body.number
      }
      const x = persons.filter((y) =>y.name === p.name)
      if (x.length !== 0) {
        return response.status(400).json({
          error: "name taken"})
      }
      console.log(p)
      persons = persons.concat(p)
      response.json(p)
    })
    
    app.get('/info', (request, response) => {
      var today = new Date()
      response.send(`Phonebook has ${people.length} people <br/>${today} <br/>`)
    })

var today = new Date();
app.get('/info', (request, response) => {
  response.send(`Phonebook has ${persons.length} people <br/>${today}`)
})
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)