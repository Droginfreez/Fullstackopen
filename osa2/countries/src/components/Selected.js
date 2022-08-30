import React from "react"

const Selected = ({country, selectName}) => {
  return (  
  <div>
    <span>{country.name.common}</span>
    <button onClick={() => selectName(country.name.common)}>Show</button>
  </div>)
}

export default Selected