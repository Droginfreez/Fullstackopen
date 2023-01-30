import {useState} from 'react'
import {Routes, Route, Link, useMatch, useNavigate} from 'react-router-dom'
import {useField} from './hooks'

const Menu = () => {
  const padding = {paddingRight: 5}
  return (
    <div>
      <Link style={padding} to='/'>Anecdotes</Link>
      <span>| </span>
      <Link style={padding} to='/create'>Create new</Link>
      <span>| </span>
      <Link style={padding} to='/about'>About</Link>
    </div>
  )
}

const Notification = (props) => {
  const style = {
    color: 'green',
    font_size: 20,
    padding: 10,
    margin_bottom: 10
  }
  if (!props.notification) {return null}
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h3>{anecdote.content}</h3>
      <div><em>by {anecdote.author}</em></div>
      <br/>
      <div>This anecdote has {anecdote.votes} votes.</div>
      <div>More information can be found <a href={anecdote.info}>here</a>.</div>
    </div>
  )
}

const AnecdoteList = ({anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is 'a story with a point.'
    </em>
    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div style={{'margin-top': '10px'}}>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    <br />
    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const {reset: resetContent, ...content} = useField('Content', 'text')
  const {reset: resetAuthor, ...author} = useField('Author', 'text')
  const {reset: resetInfo, ...info} = useField('Url', 'text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = (event) => {
    event.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <input {...content}/>
              </td>
            </tr>
            <tr>
              <td>
                <input {...author}/>
              </td>
            </tr>
            <tr>
              <td>
                <input {...info}/>
              </td>
              <td>
                <button onClick={handleSubmit} style={{"marginRight": "7px"}}>
                  create
                </button>
                <button onClick={handleReset}>
                  reset
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    setNotification(`${anecdote.content} was created`)
    setTimeout(() => {setNotification('')}, 3500)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)
    
  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {...anecdote,
      votes: anecdote.votes + 1
    }

  setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
}

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu/>
      <Notification notification={notification}/>
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />}/>
        <Route path='/create' element={<CreateNew addNew={addNew} />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
      <Footer />      
    </div>
  )
}

export default App