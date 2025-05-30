import { useState, useRef } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";
import styled from 'styled-components';

  const StyledButton = styled.button`
        padding: 6px;
        border: none;
        font-style: ${props => props.disabled ? 'italic' : 'normal'};
    `;

function TodoForm({onAddTodo, isSaving}){
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const inputRef = useRef(null); 
    const isButtonDisabled = isSaving || workingTodoTitle === '';
 
    async function handleAddTodo(title){
      const newTodo = {
      title: title.trim(),
      isCompleted: false,
    };

    if (!newTodo.title) return;
    await onAddTodo(newTodo);
     setWorkingTodoTitle("");
    }

    
    return(
        <form onSubmit={async(e) => {e.preventDefault(); await handleAddTodo(workingTodoTitle);}} action="">
            <TextInputWithLabel ref={inputRef} value={workingTodoTitle} onChange={ (e) => setWorkingTodoTitle(e.target.value)} elementId="todoTitle" labelText="Todo" />
            <StyledButton type="submit" disabled={isButtonDisabled}>{isSaving ? 'Saving ...': 'Add Todo'}</StyledButton>
        </form>
    )
}

export default TodoForm