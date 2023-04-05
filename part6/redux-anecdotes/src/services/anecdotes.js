import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async (content) => {
    const response = await axios.post(url, content)
    return response.data
  }

const vote = async (id) => {
    const object = await axios.get(`${url}/${id}`)
    object.data.votes += 1
    const response = await axios.put(`${url}/${id}`,object.data)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, vote }