import axios from 'axios'
const url = '/api/persons'

const getPersons = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const postPerson = (newObject) => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${url}/${id}`)

    return request.then(response => response.data)
}

const updatePerson = (id, name,number) => {
    const request = axios.put(`${url}/${id}`, {name: name,number: number})
    return request.then(response => response.data)
}


export default {
    getPersons, postPerson, deletePerson, updatePerson
}