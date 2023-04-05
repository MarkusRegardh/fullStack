import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(url).then(res => res.data)

export const createAnecdote = async (newAnecdote) => {
    const res = await axios.post(url, newAnecdote)
    return res.data
}

export const voteAnecdote = (anecdote) => {
          axios.put(`${url}/${anecdote.id}`, anecdote).then(res => {
            return res.data
        })}