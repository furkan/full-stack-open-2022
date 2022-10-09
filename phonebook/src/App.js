import { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = ({newFilter, handleFilterChange}) => (
  <>
    <p>filter shown with</p>
    <input
      value={newFilter}
      onChange={handleFilterChange}
    />
  </>
)

const PersonForm = (props) => (
  <form>
    <div>
      name:
      <input
        value={props.newName}
        onChange={props.handleNameChange}
      />
    </div>
    <div>
      number:
      <input
        value={props.newNumber}
        onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit" onClick={props.handleClick}>add</button>
    </div>
  </form>
)

const DeletePersonButton = ({person, handleDeleteClick}) => {
  const handleClick = () => {
    handleDeleteClick(person)
  }
  return <button onClick={handleClick}>delete</button>
}

const Person = ({person, handleDeleteClick}) => (
  <li>{person.name} {person.number} <DeletePersonButton person={person} handleDeleteClick={handleDeleteClick} /></li>
)

const Persons = (props) => (
  <ul>
    {props.persons
       .filter((person) => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
       .map((person) => <Person key={person.id} person={person} handleDeleteClick={props.handleDeleteClick} />)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('New person')
  const [newNumber, setNewNumber] = useState('+90')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)){
        const personObject = persons.find((person) => person.name === newName)
        const newPersonObject = {...personObject, number: newNumber}
        personService
          .update(newPersonObject.id, newPersonObject)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const handleDeleteClick = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
      personService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleClick={handleClick}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  )
}

export default App
