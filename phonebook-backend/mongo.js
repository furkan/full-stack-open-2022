const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Add person: node mongo.js <password> <name> <number>')
  console.log('See people: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
var personName = ''
var personNumber = ''

if (process.argv.length === 5) {
  personName = process.argv[3]
  personNumber = process.argv[4]
}

const url = `mongodb+srv://furkan:${password}@phonebook.x5juksm.mongodb.net/personApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log('connected')

      const person = new Person({
        name: personName,
        number: personNumber,
      })

      return person.save()
    })
    .then(() => {
      console.log('person saved!')
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then((result) => {
      Person.find({}).then(persons => {
        persons.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
    })
    .catch((err) => console.log(err))
}