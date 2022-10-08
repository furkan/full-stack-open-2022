import { useEffect, useState } from "react";
import axios from 'axios'

const Search = ({newFilter, handleFilterChange}) => (
  <>
    <h3>find countries</h3>
    <input
      value={newFilter}
      onChange={handleFilterChange}
    />
  </>
)

const Country = ({country}) => {
  const languages = Object.values(country.languages)
  return (
    <>
      <h2>{country.flag} {country.name.common} {country.flag}</h2>
      <br/>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <br/>
      <h4>languages:</h4>
      {languages.map((language) => <p key={language}>{language}</p>)}
    </>
  )
}

const Results = ({countries, newFilter}) => {
  const resultCountries = countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  if (resultCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (resultCountries.length === 0) {
    return <p>No matching countries</p>
  } else if (resultCountries.length > 1) {
    return (
      <ul>
        {resultCountries.map((country) => <li key={country.name.official}>{country.name.common}</li>)}
      </ul>
    )
  }
  return <Country country={resultCountries[0]} />
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <>
      <Search newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Results countries={countries} newFilter={newFilter} />
    </>
  )
}

export default App;
