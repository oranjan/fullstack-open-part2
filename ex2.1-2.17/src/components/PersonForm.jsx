
const PersonForm = ({ onSubmit, setNewName, newName, number, setNumber }) => {
    return (
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
    )
}

export default PersonForm
