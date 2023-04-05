import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useMutation , useQueryClient} from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useContext } from "react"
import  NotificationContext  from "./NotificationContext"

const App = () => {

  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  
    const handleVote = (anecdote) => {
      anecdote.votes += 1
      updateAnecdoteMutation.mutate(anecdote)
      dispatch({type: 'SET', payload: `You liked ${anecdote.content}`})
      setTimeout(() => {
        dispatch({type: 'UNSET'})
      }, 5000)
    }
    

  const result = useQuery('anecdotes', getAnecdotes)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>Anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
