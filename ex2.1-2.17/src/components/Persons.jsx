import React from 'react'

const Persons = ({filteredList, onDelete}) => {
    return (
        <>
            {filteredList?.map(p => (
                <p key={p.name}>
                    {p.name} <span>{p.phoneNumber}</span>
                    <button onClick={() => onDelete(p.id)}>delete</button>
                </p>
            ))}
        </>
    )
}

export default Persons
