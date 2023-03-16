import { useState, useEffect } from 'react'
import personService from './services/persons'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Name = ({person, handleDelete}) => {

  return <> 
  {person.name} {person.number} <Button handleClick={() => handleDelete(person)} text="delete" />
  <br></br>
  </>
}

const NameList = ({persons, nameFilter, handleDelete}) => {
  return (
    <div>
        {persons.filter(person => nameFilter==='' ? true : person.name.includes(nameFilter)).map((person) => <Name key={person.id} person={person} handleDelete={handleDelete}/> )}
    </div>
)}

const PhoneForm = ({addPerson, newName, handleName, newNumber, handleNumber}) => {
  return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)}

const Filter = ({nameFilter, handleFilter}) => {
  return (
    <form >
    <div>
      filter shown with <input value={nameFilter} onChange={handleFilter}/>
    </div>
  </form>
  )
}

const Success = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [success, setSuccess]= useState(null)
  const [error, setError]= useState(null)

  useEffect(() => {
    personService.getPersons().then(response => {
        setPersons(response)
      })
  }, [])

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      personService.deletePerson(person.id).then(response => {
        personService.getPersons().then(response => {
          setPersons(response)
        })
      })
    }
    
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const addPerson = (event) => {
    if (persons.some(person => person.name === newName)){
        if (window.confirm(`${newName} is already added to the Phonebook, replace the old number with the new one?`)){
          event.preventDefault()
          const person = persons.find(p => p.name === newName)
          personService.updatePerson(person.id, newName,newNumber).then(response => {
            console.log(response)
            setSuccess(`${newName} modified`)
            setTimeout(() => {
            setSuccess(null)
           }, 3000)
           
          }).catch(e =>{
            setError(`${newName} has already been removed from server`)
            setTimeout(() => {
            setError(null)
           }, 3000)
          })
          personService.getPersons().then(response => {
            setPersons(response)
          })
          
        }
    } else {
    event.preventDefault()
    personService.postPerson({name: newName, number: newNumber}).then(response => {
      setPersons(persons.concat(response))
    })
    setNewName('')
    setNewNumber('')
    setSuccess(`${newName} added`)
    setTimeout(() => {
      setSuccess(null)
    }, 3000)
  }}

  

  return (
    <div>
      <h1>Phonebook</h1>
      <Success message={success}/>
      <Error message={error}/>
        <Filter nameFilter={nameFilter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
        <PhoneForm addPerson={addPerson} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
        <h2>Numbers</h2>
       <NameList persons={persons} nameFilter={nameFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App