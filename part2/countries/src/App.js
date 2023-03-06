import { useState, useEffect } from 'react'
import  countryService from './services/countries'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Filter = ({filter, handleFilter}) => {
  return (
    <form >
    <div>
      filter countries <input value={filter} onChange={handleFilter}/>
    </div>
  </form>
  )
}

const TooMany = () => {
  return (
    <>
    <p>Too many matches, specify another filter</p>
    </>
  )
}

const CountryName = ({country, setFilter}) => {
  return (
    <>
    {country.name.common}
    <Button handleClick={() => setFilter(country.name.common)} text='show'/>
    <br></br>
    </>
  )
}

const Multiple = ({countries, setFilter}) => {
  return (
    <>
    {countries.map((country,index) => <CountryName key={index} country={country} setFilter={setFilter}/>)}
    </>
  )
}

const Country = ({country, fetchWeather, weather}) => {
  const languages = Object.values(country.languages)
  fetchWeather(country.capitalInfo.latlng)
  return (
    <>
    <h2> {country.name.common}</h2>
    <p> capital {country.capital[0]}</p>
    <p> area {country.area}</p>
    <h3>languages: </h3>
    <ul>
    {languages.map((l,index) => <li key={index}> {l} </li>)}
    </ul>
    <img
    src={country.flags.png}
    />
    <h2>Weather in {country.capital[0]}</h2>
    <p>temperature {weather.temp} Celcius</p>
    <img 
      src={`https://openweathermap.org/img/wn/${weather.imageID}@2x.png`}
    />
    <p> wind {weather.wind} m/s</p>
    </>
  )
}

const Display = ({allCountries, filter, setFilter, fetchWeather, weather}) => {
if (allCountries.length === 0){
  return (
    <>
      <p> Please await for an answer from the API</p>
    </>
  )
}

const countries = allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

if (countries.length > 10 || countries.length == 0){
  return (
    <>
    <TooMany/>
    </>
  )
}
if (countries.length > 1){
  return (
    <>
      <Multiple countries={countries} setFilter={setFilter} />
    </>
  )
}
return (
  <>
    <Country country={countries[0]} fetchWeather={fetchWeather} weather={weather} />
  </>
)


}

const App = () => {
  
const [filter, setFilter] = useState('')
const [allCountries, setAllCountries] = useState([])
const [weather, setWeather]= useState({})


const handleFilter = (event) => {
  setFilter(event.target.value)
}

const fetchWeather = (coords) => {
  countryService.getWeather(coords).then(response => {
    setWeather({
      temp: response.main.temp,
      wind: response.wind.speed,
      imageID: response.weather[0].icon
    })
  })
}

useEffect(() => {
  countryService.getCountries().then(response => {
      setAllCountries(allCountries => [...response])
    })
},[])




  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Display allCountries={allCountries} filter={filter} setFilter={setFilter} fetchWeather={fetchWeather} weather={weather} />
    </div>
  )
}

export default App