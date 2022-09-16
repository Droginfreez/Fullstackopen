const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Anna salasana')
  process.exit(1)
}

const password = process.argv[2]
const url =
`mongodb+srv://Droginfreez:${password}@cluster0.fknikkk.mongodb.net/Puhelinluettelo-backend?retryWrites=true&w=majority`


mongoose.connect(url)
  .then(() => {
    console.log('connected')
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 5) {
  person.save().then(() => {
    console.log(`Added ${process.argv[3]} ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('Phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 4 || process.argv.length > 5) {
  console.log(
    'Please provide the right number of arguments. If the name you are trying to add containes spaces, wrap it in quotes.',
  )
  mongoose.connection.close()
}