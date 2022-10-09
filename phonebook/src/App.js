import { useEffect, useState } from 'react'
import axios from 'axios'

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

const Persons = (props) => (
  <ul>
    {props.persons
       .filter((person) => person.name.toLowerCase().includes(props.newFilter.toLowerCase()))
       .map((person) => <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('New person')
  const [newNumber, setNewNumber] = useState('+90')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook!`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
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
      />
    </div>
  )
}

export default App
