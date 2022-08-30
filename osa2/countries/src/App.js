import { useState, useEffect } from 'react'
import axios from 'axios'
import Input from './components/Input'
import Countries from './components/Countries'
const App = () => {
  console.log(process.env.REACT_APP_API_KEY)
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(response => {
      if (search !== "") {
        const filtered = response.data.filter(country =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
        setCountries(filtered)
        console.log(filtered)
      }
    })
  }, [search])

  const searchName = event => {
    setSearch(event.target.value)
  }
  const selectName = countryName => {
    setSearch(countryName)
  }

    
  return (
    <div>
      <Input value={search} onChange={searchName} placeholder={'search'}/>
      <Countries selectName={selectName} countries={countries}/>
    </div>
  )
}

export default App