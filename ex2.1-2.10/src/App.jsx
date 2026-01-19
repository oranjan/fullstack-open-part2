
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

  const getAll = () => {
    personService.getAll().then(res => {
      setFilteredList(res)
      setPersons(res)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!newName || !number) return
    const isDupe = persons.filter(p => p.name === newName)
    if (isDupe.length > 0) {
      alert(`${newName} is already added to phonebook replace the old number with new one `)
      personService.update(isDupe[0].id,
        {
          name: newName,
          phoneNumber: number
        }).then(data => getAll())
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
    getAll()
  }, [])

  const handleDelete = (id) => {
    const c = confirm("delete")
    if (!c) return
    personService.remove(id).then(data => {
      getAll()
    })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={term} handleSearch={handleSearch} />
      <PersonForm onSubmit={onSubmit} setNewName={setNewName} newName={newName} number={number} setNumber={setNumber} />
      <h3>Add a new</h3>
      <h2>Numbers</h2>
      <Persons filteredList={filteredList} onDelete={handleDelete} />
    </div>
  )
}

export default App
