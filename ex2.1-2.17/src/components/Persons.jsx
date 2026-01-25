const Persons = ({filteredList, onDelete}) => {
    return (
        <>
            {filteredList?.map(p => (
                <p key={p.id}>
                    {p.name} <span>{p.phoneNumber}</span>
                    <button onClick={() => onDelete(p.id)}>delete</button>
                </p>
            ))}
        </>
    )
}

export default Persons
