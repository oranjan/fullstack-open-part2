
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
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

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
      if (isDupe[0].phoneNumber === number) {
        setErrorMsg(`${newName} is already added to phonebook replace the old number with new one `)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        return
      }
      personService.update(isDupe[0].id,
        {
          name: newName,
          phoneNumber: number
        })
        .then(data => {
          getAll()
          setSuccessMsg(`${newName}'s number has been updated`)
          setTimeout(() => {
            setSuccessMsg(null)
          }, 5000)

        }

        )
        .catch(err => {
        })
      return
    }

    setPersons([...persons, { name: newName, phoneNumber: number }])
    setFilteredList([...persons, { name: newName, phoneNumber: number }])
    setNewName('')
    setNumber('')

    personService.create({ name: newName, phoneNumber: number }).then(() => {
      setSuccessMsg(`${newName} is added to phonebook `)
      setTimeout(() => {
        setSuccessMsg(null)
      }, 5000)
    })
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

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }


  const sucessStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }


  return (
    <div>
      <h2>Phonebook</h2>
      {
        errorMsg && <p style={errorStyle}>{errorMsg}</p>
      }

      {
        successMsg && <p style={sucessStyle}>{successMsg}</p>
      }

      <Filter term={term} handleSearch={handleSearch} />
      <PersonForm onSubmit={onSubmit} setNewName={setNewName} newName={newName} number={number} setNumber={setNumber} />
      <h3>Add a new</h3>
      <h2>Numbers</h2>
      <Persons filteredList={filteredList} onDelete={handleDelete} />
    </div>
  )
}

export default App
