import styled from 'styled-components'
//Start of styling
    const StyledInput = styled.input`
        padding: 5px;
        border: 1px solid var(--primary-color);
        width: 240px;
    `;
//End of Stylling
function TextInputWithLabel ({elementId, label, onChange, inputRef, value}){
    return(
        <>
            <label htmlFor={elementId}>{label}</label>
            <StyledInput type="text" id={elementId} ref={inputRef} value={value} onChange={onChange}/> 
        </>
);
}

export default TextInputWithLabel

