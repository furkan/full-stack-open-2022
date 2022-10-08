import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('New person')
  const [newNumber, setNewNumber] = useState('+90')
  const [newFilter, setNewFilter] = useState('')

  const handleClick = (event) => {
    event.preventDefault()
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} is already in the phonebook!`)
    } else {
    setPersons(persons.concat({name: newName, number: newNumber}))
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
