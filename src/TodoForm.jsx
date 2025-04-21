// import { useRef } from "react";
import { useState } from "react";

 

function TodoForm({onAddTodo}){
//  const todoTitleInput = useRef(" ");
 const [workingTodoTitle, setWorkingTodoTitle] = useState(" ");
 
    function handleAddTodo(title){
        // event.preventDefault();
        // console.dir(event.target.title.value)
        // const title = event.target.title.value;
        onAddTodo(title);
        // event.target.title.value = " ";
        // todoTitleInput.current.focus();
        setWorkingTodoTitle("");
    }
    
    return(
        <form onSubmit={(e) => {
      e.preventDefault();
      handleAddTodo(workingTodoTitle);
    }} action="">
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" name="title" value={workingTodoTitle} onChange={ (e) => setWorkingTodoTitle(e.target.value)}/>
            <button type="submit" disabled={workingTodoTitle === ""}>Add Todo</button>
        </form>
    )
}

export default TodoForm