import { newAnecdote} from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const getId = () => (100000 * Math.random()).toFixed(0)

    const asObject = (anecdote) => {
        return {
            content: anecdote,
            id: getId(),
            votes: 0
         }
        }
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(asObject(content)))
        dispatch(setNotification(`Added '${content}'`,5))
      }

      return (
        <>
        <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
      </>
      )
}

export default AnecdoteForm