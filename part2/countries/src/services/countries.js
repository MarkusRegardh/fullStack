import axios from 'axios'
const countriesUrl = 'https://restcountries.com/v3.1/all'
const openWeatherMapUrl = 'http://api.openweathermap.org/'
const apiKey = process.env.REACT_APP_API_KEY

const getCountries = () => {
    const request = axios.get(countriesUrl)
    return request.then(response => response.data)
}

const getWeather = (coords) => {
    const lat = coords[0]
    const lon = coords[1]
    const request = axios.get(`${openWeatherMapUrl}data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    return request.then(response => response.data)
}



export default {
    getCountries, getWeather
}