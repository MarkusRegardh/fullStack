import { useSelector, useDispatch } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {

    
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if (filter === ''){
            return [...anecdotes].sort((n,m) => m.votes - n.votes)
        }
        return [...anecdotes].filter((anecdote) => anecdote.content.includes(filter)).sort((n,m) => m.votes - n.votes)
    })
    const dispatch = useDispatch()
    
    const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
      
    }
  

    return (
        <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}</>
    )

}

export default AnecdoteList