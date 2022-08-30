import { useState , useEffect} from 'react'
import axios from 'axios'

const CountryInfo = ({country}) => {
  const [weather, setWeather] = useState([])

useEffect(() => {
  const URL = "https://api.openweathermap.org/data/2.5/weather"
  const api_key = process.env.REACT_APP_API_KEY
    axios.get(`${URL}?appid=${api_key}&lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric`)
      .then(response => {
        const apiResponse = response.data
        setWeather([apiResponse])
      })
})

var lang = Object.keys(country.languages).map(function(key) {
  return <option value={key}>{country.languages[key]}</option>
})

if (weather.length > 0) {
const currentWeather = weather[0]
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <li>{lang}</li>
      <img src={country.flags.svg} width="150" height="100"/>
      <h2>Weather</h2>
      <p>temperature: {currentWeather.main.temp}° Celcius</p>
      <p>wind: {currentWeather.wind.speed} m/s</p>
      <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}></img>
    </div>
  )

}
}

export default CountryInfo