import React from 'react'
import Persons from './components/persons'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault()

    const exists = persons.some(p => p.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNumber('')
      return 1;
    }

    setPersons(persons.concat({name: newName, number: newNumber}))
    
    setNewName('')
    setNumber('')
  }

  // console.log(persons)

  return (
    <div>
      <div>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch}/>
      </div>
      <h2>Phonebook</h2>

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  newNumber={newNumber} 
                  handleNameChange={handleNameChange} 
                  handleNumberChange={handleNumberChange}
                  />

      <h2>Numbers</h2>
      {filteredPersons.map(person => {
        return <Persons key={person.name} name={person.name} number={person.number}/>
      })}
    </div>
  )
}

export default App