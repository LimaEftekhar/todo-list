
import { useState } from "react";

 

function TodoForm({onAddTodo}){
    const [workingTodoTitle, setWorkingTodoTitle] = useState(" ");
 
    function handleAddTodo(title){
        onAddTodo(title);
        setWorkingTodoTitle("");
    }
    
    return(
        <form onSubmit={(e) => {e.preventDefault(); handleAddTodo(workingTodoTitle);}} action="">
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" name="title" value={workingTodoTitle} onChange={ (e) => setWorkingTodoTitle(e.target.value)}/>
            <button type="submit" disabled={workingTodoTitle === ""}>Add Todo</button>
        </form>
    )
}

export default TodoForm