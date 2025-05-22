import { useEffect, useState } from "react";

function TodosViewForm ({sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString  }){
    const [localQueryString, setLocalQueryString] = useState(queryString);
    function preventRefresh(event){
        event.preventDefault();
    }
    useEffect (() =>{
        const debounce = setTimeout (() => {
            setQueryString(localQueryString);

        }, 500);
        return () => {
        clearTimeout (debounce);
        };
    },[localQueryString, setQueryString]);

    return(
        <div>
            <div>
            <label htmlFor="search">Search todos:</label>
            <input id="search" type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)} />
            <button type="button" onClick={ () => setLocalQueryString('') }>Clear</button>
            </div>

            <form action="" onSubmit={preventRefresh} >
                <label htmlFor="view">Sort by</label>
                <select name="" id="view" value= {sortField} onChange={ (e) => setSortField (e.target.value)}>
                    <option value="title">Title</option>
                    <option value="createdTime">Time added</option>
                </select>
                <label htmlFor="order">Direction</label>
                <select name="" id="order" value={sortDirection} onChange={ (e) => setSortDirection (e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </form>
        </div>
    )
}

export default TodosViewForm