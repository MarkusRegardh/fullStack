import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from "react"
import  NotificationContext  from "../NotificationContext"

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const getID =() => {
    return Math.floor(Math.random() * 100000)
  }

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({type: 'SET', payload: `Addedw ${data.content}`})
      setTimeout(() => {
        dispatch({type: 'UNSET'})
      }, 5000)
    },
    onError: () => {
      dispatch({type: 'SET', payload: 'Anecdotes must be atleast 5 characters long'})
      setTimeout(() => {
        dispatch({type: 'UNSET'})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: getID(), votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
