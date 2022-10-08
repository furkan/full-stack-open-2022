import { useEffect, useState } from "react";
import axios from 'axios'

const Button = ({country, countries, showCountry, setShowCountry}) => {
  const index = countries.findIndex((c) => c === country)
  const handleClick = () => {
    const currentShow = showCountry[index]
    const copyShow = Array(showCountry.length).fill(false)
    copyShow[index] = !currentShow
    setShowCountry(copyShow)
  }
  return (
    <button onClick={handleClick}>{showCountry[index] ? 'HIDE' : 'SHOW'}</button>
  )
}

const Search = ({newFilter, handleFilterChange}) => (
  <>
    <h3>find countries</h3>
    <input
      value={newFilter}
      onChange={handleFilterChange}
    />
  </>
)

const CountryUnderButton = ({countries, country, showCountry}) => {
  const index = countries.findIndex((c) => c === country)
  if (!showCountry[index]) return <></>
  else return <Country country={country} />
}

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

const Results = ({countries, newFilter, showCountry, setShowCountry}) => {
  const resultCountries = countries.filter((country) => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  if (resultCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (resultCountries.length === 0) {
    return <p>No matching countries</p>
  } else if (resultCountries.length > 1) {
    return (
      <ul>
        {resultCountries.map((country) => (
          <li key={country.name.official}>
            {country.name.common} &nbsp;
            <Button
              country={country}
              countries={countries}
              showCountry={showCountry}
              setShowCountry={setShowCountry}
            />
            <CountryUnderButton countries={countries} country={country} showCountry={showCountry} />
          </li>
        ))}
      </ul>
    )
  }
  return <Country country={resultCountries[0]} />
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showCountry, setShowCountry] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setShowCountry(Array(response.data.length).fill(false))
      })
  }, [])

  const numOfCountries = countries.length

  const handleFilterChange = (event) => {
    setShowCountry(Array(numOfCountries).fill(false))
    setNewFilter(event.target.value)
  }

  return (
    <>
      <Search newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Results
        countries={countries}
        newFilter={newFilter}
        showCountry={showCountry}
        setShowCountry={setShowCountry}
      />
    </>
  )
}

export default App;
