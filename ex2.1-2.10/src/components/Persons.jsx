import React from 'react'

const Persons = ({filteredList}) => {
    return (
        <>
            {filteredList?.map(p => (<p key={p.name}>{p.name} <span>{p.phoneNumber}</span> </p>))}
        </>
    )
}

export default Persons
