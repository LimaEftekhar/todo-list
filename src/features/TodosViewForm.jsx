
function TodosViewForm ({sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString  }){
    function preventRefresh(event){
        event.preventDefault();
    }

    return(
        
        <div>
            <div>
            <label htmlFor="search">Search todos:</label>
            <input id="search" type="text"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)} />
            <button type="button" onClick={ () => setQueryString('') }>Clear</button>
            </div>

            <form action="" onSubmit={preventRefresh} >
                <label htmlFor="view">Sort by</label>
                <select name="" id="view" onChange={ (e) => setSortField (e.target.value)} value= {sortField}>
                    <option value="title">Title</option>
                    <option value="createdTime">Time added</option>
                </select>
            </form>
        </div>
    )
}

export default TodosViewForm