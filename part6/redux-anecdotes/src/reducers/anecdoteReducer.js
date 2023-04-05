import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers : {
    createAnecdote(state, action) {
      return state.concat(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(n => n.id !== id ? n : changedAnecdote)
    },
    init(state,action) {
      return action.payload
    }
  }
})


export default anecdoteSlice.reducer
export const {vote, createAnecdote, init} =  anecdoteSlice.actions

export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(init(anecdotes))
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const toAdd = await anecdoteService.createNew(content)
    dispatch(createAnecdote(toAdd))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch(vote(id))
  }
}