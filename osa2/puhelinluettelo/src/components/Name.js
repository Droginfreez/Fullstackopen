import React from 'react'

const Name = ({name, deletePerson}) => {
  return (<li>{name.name} : {name.number} <button onClick={() => deletePerson(name.id)}>delete</button></li>)
}
export default Name