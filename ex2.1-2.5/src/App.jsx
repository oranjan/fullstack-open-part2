// import Course from "./components/Course";

// const App = () => {
//   const courses = [
//     {
//       name: "Half Stack application development",
//       id: 1,
//       parts: [
//         {
//           name: "Fundamentals of React",
//           exercises: 10,
//           id: 1,
//         },
//         {
//           name: "Using props to pass data",
//           exercises: 7,
//           id: 2,
//         },
//         {
//           name: "State of a component",
//           exercises: 14,
//           id: 3,
//         },
//         {
//           name: "Redux",
//           exercises: 11,
//           id: 4,
//         },
//       ],
//     },
//     {
//       name: "Node.js",
//       id: 2,
//       parts: [
//         {
//           name: "Routing",
//           exercises: 3,
//           id: 1,
//         },
//         {
//           name: "Middlewares",
//           exercises: 7,
//           id: 2,
//         },
//       ],
//     },
//   ];

//   return (
//     <div>
//       <h1>Web development curriculam</h1>
//       {courses.map((course) => (
//         <Course key={course.id} course={course} />
//       ))}
//     </div>
//   );
// };

// export default App;


import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: 1234567890 }
  ])
  const [filteredList, setFilteredList]=useState(persons)
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [term, setTerm] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const isDupe = persons.some(p => p.name === newName)
    if (isDupe) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName, phoneNumber: number }])
    setFilteredList([...persons, { name: newName, phoneNumber: number }])
    setNewName('')
    setNumber('')
  }

  const handleSearch = (e) => {
    setTerm(e.target.value)
    setFilteredList(persons.filter(p => p.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
              <div>
        filter shown with: <input type="text" value={term} onChange={handleSearch} />
        </div>

      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={e => setNewName(e.target.value)} value={newName} />
        </div>
        <br />
        <div>
          number: <input type='number' onChange={e => setNumber(e.target.value)} value={number}
            maxLength={10} minLength={10}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredList.map(p => (<p key={p.name}>{p.name} <span>{p.phoneNumber}</span> </p>))}
    </div>
  )
}

export default App
