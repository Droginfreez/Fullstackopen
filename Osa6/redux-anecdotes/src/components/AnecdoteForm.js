import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {showNotif} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newAnecdote.value
    event.target.newAnecdote.value = ''
    props.createAnecdote(content)
    props.showNotif(`anecdote added: ${content}`, 1)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name='newAnecdote' />
      <button type='submit'>add</button>
    </form>
  )
}

const mapDispatchToProps = {createAnecdote, showNotif}

export default connect(null, mapDispatchToProps) (AnecdoteForm)