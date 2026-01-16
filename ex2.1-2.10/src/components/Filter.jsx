const Filter = ({ term, handleSearch }) => {
    return (
        <div>
            filter shown with: <input type="text" value={term} onChange={handleSearch} />
        </div>
    )
}

export default Filter
