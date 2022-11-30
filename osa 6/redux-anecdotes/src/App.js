import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {initAnecdotes} from './reducers/anecdoteReducer'


import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList/>
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App