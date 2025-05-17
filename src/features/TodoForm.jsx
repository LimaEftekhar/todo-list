import { useState, useRef } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";

function TodoForm({onAddTodo, isSaving}){
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const inputRef = useRef(null); 
 
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
            <button type="submit" disabled={isSaving}>{isSaving ? 'Saving ...': 'Add Todo'}</button>
        </form>
    )
}

export default TodoForm