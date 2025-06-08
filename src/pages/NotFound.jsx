import React from "react";
import styled from 'styled-components';


const StyledA = styled.a`
    color: var(--primary-color);
`

function NotFound({title}){
    return(
        <>
            <h1>{title}</h1>        
            <p>page not found</p>
            <StyledA href="/">Home</StyledA>
            
        </>
    )
}
export default NotFound;