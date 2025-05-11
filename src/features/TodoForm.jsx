
import { useState, useRef } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel.jsx";
 

function TodoForm({onAddTodo}){
    const [workingTodoTitle, setWorkingTodoTitle] = useState(" ");
    const inputRef = useRef(null); 
 
    function handleAddTodo(title){
        onAddTodo(title);
        setWorkingTodoTitle("");
    }
    
    return(
        <form onSubmit={(e) => {e.preventDefault(); handleAddTodo(workingTodoTitle);}} action="">
            <TextInputWithLabel ref={inputRef} value={workingTodoTitle} onChange={ (e) => setWorkingTodoTitle(e.target.value)} elementId="todoTitle" labelText="Todo" />
            {/* <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" name="title" value={workingTodoTitle} onChange={ (e) => setWorkingTodoTitle(e.target.value)}/> */}
            <button type="submit" disabled={workingTodoTitle === ""}>Add Todo</button>
            
        </form>
    )
}

export default TodoForm