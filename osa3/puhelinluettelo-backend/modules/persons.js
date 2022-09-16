const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected')
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

const numberValidators = [
  {
    // Minimum length validator
    validator: (number) => {
      if ((number[2] === '-' || number[3] === '-') && number.length < 9) {
        return false
      }
      return true
    },
    msg: 'must be at least 8 digits',
  },
  {
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number)
    },
    msg: 'invalid number'
  },
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: numberValidators,
    required: true,
  },
})
    

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
    
module.exports = mongoose.model('Person', personSchema)