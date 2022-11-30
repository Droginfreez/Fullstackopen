import React from 'react'
import {connect} from 'react-redux'
import {voteForAnecdote} from '../reducers/anecdoteReducer'
import {showNotif} from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = ({anecdotes, voteForAnecdote, showNotif}) => {
  const vote = (id) => {
    voteForAnecdote(id);
    const content = anecdotes.find((a) => a.id === id).content;
    showNotif(`You voted for: ${content}`, 5);
  }

  const Anecdote = ({anecdote}) => {
    return (
      <div className='anecdote'>
        <div>{anecdote.content}</div>
        <div>
          Has <strong>{anecdote.votes}</strong>{' '}
          {anecdote.votes === 1 ? 'vote' : 'votes'}{' '}
          <button onClick={() => vote(anecdote.id)}>Vote</button>
        </div>
      </div>
    )
  }


  return (
    <div>
    <Filter/>
      {anecdotes.sort((min, max) => max.votes - min.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote}/>
        ))
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter) {
    return {
      anecdotes: state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    }
  }
  return {anecdotes: state.anecdotes}
}

const mapDispatchToProps = {voteForAnecdote, showNotif}

const ConnectedAnecdotes = connect(
  mapStateToProps, mapDispatchToProps
) (AnecdoteList)

export default ConnectedAnecdotes