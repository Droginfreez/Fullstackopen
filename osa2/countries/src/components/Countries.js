import React from "react"
import CountryInfo from "./CountryInfo"
import Selected from "./Selected"

const Countries = ({countries, selectName}) => {
  if (countries.length > 10) {
    return ( <p>be more specific</p>)

  } else if (countries.length > 1 && countries.length < 10) {
    return (
      <li> 
        {countries.map((country) => 
          <Selected country={country} selectName={selectName} key={country.name.common}/>
        )}
      </li>
    )

  } else if (countries.length === 1) {
    return (
      <div>
        {countries.map(country => 
        <CountryInfo key={country.name.common} country={country}/>
        )}
      </div>
    )
  } else {return}
}

export default Countries