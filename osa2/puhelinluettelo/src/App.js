import {useState, useEffect} from 'react'
import Name from './components/Name'
import Input from './components/Input'
import server from './components/backend'
import Notification from './components/notification'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const person = people.filter((person) =>person.name === newName)
  const target = person[0]
  const updatedPerson = { ...target, number: newNumber }

  useEffect(() => {
    server.get()
    .then(response => {
      setPeople(response)})
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
   

      if (person.length !== 0) {
        if (window.confirm("name "+newName+" is taken, replace number?")) {
          server.update(updatedPerson.id, updatedPerson).then(resp => {
            setPeople(people.map(person => person.id !== target.id ? person : resp))
            setNewName('')
            setNewNumber('')
            setMessage(`${updatedPerson} was updated`)
            setTimeout(() => {setMessage(null)}, 3000)
          })
           .catch((error) => {
            console.log(error)
            setPeople(people.filter(person => person.id !== updatedPerson.id))
            setNewName('')
            setNewNumber('')
            setMessage(
              `[ERROR] ${updatedPerson.name} was already deleted from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        }
      } else {
        const x = {
          name: newName,
          number: newNumber,
          id: people.length+1
        }
        server.create(x).then(response => {
          setPeople(people.concat(response))
          setTimeout(() => {}, 5000)
          setNewName('')
          setNewNumber('')
          setMessage(`${newName} was added`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
      }
  }

  const deletePerson = (id) => {
    const filtered = people.filter(person => person.id === id)
    const target = filtered[0].id
    if (window.confirm('Confirmation')) {
      server.remove(target)
      setPeople(people.filter(person => person.id !== target))
      setMessage(`${filtered[0].name} was deleted`)
      setTimeout(() => {setMessage(null)}, 3000)
    }
  }

  const nameChanger = (event) => {
    return (setNewName(event.target.value))
  }
  const numberChanger = (event) => {
    return (setNewNumber(event.target.value))
  }

  const searchName = (event) => {
    const filtered = people.filter((person) =>
    person.name.toLowerCase().includes(event.target.value.toLowerCase()));
    return setSearch(filtered)
  }
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <h3>Search</h3>
      <Input onChange={searchName} placeholder={'search'}/>
      <h3>Add person</h3>
      <form onSubmit={addPerson}>
        <Input value={newName} onChange={nameChanger} placeholder={'name'}/>
        <Input value={newNumber} onChange={numberChanger} placeholder={'number'}/>
        <div/><button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {(search || people).map(name => 
        <Name key={name.id} name={name} deletePerson={deletePerson}/>
      )}
    </div>
  )
}

export default App