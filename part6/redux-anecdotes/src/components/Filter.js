import {  useDispatch } from 'react-redux'
import {update} from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

   const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
        dispatch(update(content))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input name="filter" onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter