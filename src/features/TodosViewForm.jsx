import { useEffect, useState } from "react";
import styled from 'styled-components'

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


    //Style
    const StyledInput = styled.input`
        padding: 5px;
        border: 1px solid var(--primary-color);
        width: 150px;
    `;

    const StyledButton = styled.button`
        padding: 6px;
        width: 60px;
        border: none;
    
    `;

    const StyledLabel = styled.label`
        padding: 5px;
        margin-right: 5px;
    `;

    const StyledSelect = styled.select`
        padding: 2px;
        border: 1px solid var(--primary-color);
        background-color: var(--bg-color);
        color: var(--text-color)
    `;

    const StyledDiv = styled.div`
        margin-bottom: 15px;
    `;

    return(
        <div>
            <StyledDiv>
            <StyledLabel htmlFor="search">Search todos:</StyledLabel>
            <StyledInput id="search" type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)} />
            <StyledButton type="button" onClick={ () => setLocalQueryString('') }>Clear</StyledButton>
            </StyledDiv>

            <form action="" onSubmit={preventRefresh} >
                <StyledLabel htmlFor="view">Sort by</StyledLabel>
                <StyledSelect name="" id="view" value= {sortField} onChange={ (e) => setSortField (e.target.value)}>
                    <option value="title">Title</option>
                    <option value="createdTime">Time added</option>
                </StyledSelect>
                <StyledLabel htmlFor="order">Direction</StyledLabel>
                <StyledSelect name="" id="order" value={sortDirection} onChange={ (e) => setSortDirection (e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </StyledSelect>
            </form>
        </div>
    )
}

export default TodosViewForm