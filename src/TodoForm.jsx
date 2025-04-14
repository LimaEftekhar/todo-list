import { useRef } from "react";

function TodoForm(props){
 const todoTitleInput = useRef(" ");
 
    function handleAddTodo(event){
        event.preventDefault();
        // console.dir(event.target.title.value)
        const title = event.target.title.value;
        props.onAddTodo(title);
        event.target.title.value = " ";
        todoTitleInput.current.focus();
    }
    return(
        <form onSubmit={handleAddTodo} action="">
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" name="title" ref={todoTitleInput}/>
            <button>Add Todo</button>
        </form>
    )
}

export default TodoForm