import  useField from '../hooks/index'
import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('info')
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
    }
  
    const reset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }
  
  
    
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input type={content.type} value={content.value} onChange={content.onChange} />
          </div>
          <div>
            author
            <input type={author.type} value={author.value} onChange={author.onChange} />
          </div>
          <div>
            url for more info
            <input type={info.type} value={info.value} onChange={info.onChange} />
          </div>
          <button>create</button>
        </form>
        <button onClick={reset}>reset</button>
      </div>
    )
  
  }

  export default CreateNew