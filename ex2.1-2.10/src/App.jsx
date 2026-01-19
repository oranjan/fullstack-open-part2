
import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from "axios";
 
import personService from "./services/person.js"


const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [term, setTerm] = useState('')
  console.log(filteredList)

  const onSubmit = (e) => {
    e.preventDefault()
    if(!newName || !number) return
    const isDupe = persons.some(p => p.name === newName)
    if (isDupe) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons([...persons, { name: newName, phoneNumber: number }])
    setFilteredList([...persons, { name: newName, phoneNumber: number }])
    setNewName('')
    setNumber('')

    personService.create({ name: newName, phoneNumber: number })  
  }

  const handleSearch = (e) => {
    setTerm(e.target.value)
    setFilteredList(persons.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  useEffect(() => {
    personService.getAll().then(res => {
      setFilteredList(res)
      setPersons(res)
    })
  }, [])
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={term} handleSearch={handleSearch} />
      <PersonForm onSubmit={onSubmit} setNewName={setNewName} newName={newName} number={number} setNumber={setNumber} />
      <h3>Add a new</h3>
      <h2>Numbers</h2>
      <Persons filteredList={filteredList} />
    </div>
  )
}

export default App
