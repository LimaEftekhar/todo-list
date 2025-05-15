import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { useState } from "react";
function TodoListItem({todo, onCompleteTodo, onUpdateTodo}){

    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    function handleCancel (){
        setWorkingTitle (todo.title);
        setIsEditing (false);

    }


    function handleEdit(event){
        setWorkingTitle (event.target.value);
    }

    function handleUpdate(event){
        if (!isEditing) return;
        event.preventDefault();
        onUpdateTodo({...todo, title:workingTitle});
        setIsEditing(false);
    } 

    return(

        <li>
            <form action="" onSubmit={handleUpdate}>
                {isEditing ? (
                    <>
                    <TextInputWithLabel value={workingTitle} onChange={handleEdit}/>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="button" onClick={handleUpdate}>Update</button>
                    </>
                ) : (

            
                <>
                    <label htmlFor="">
                        <input type="checkbox" name="" id={`checkbox${todo.id}`} checked={todo.isCompleted} onChange={() => onCompleteTodo(todo.id)} />
                    </label>
                    <span onClick={() => setIsEditing(true)}>{todo.title}</span>
                
                </>

                
                )}

                {/* <input type="checkbox" checked = {todo.isCompleted} onChange={() => onCompleteTodo(todo.id)} />
                {todo.title} */}
            </form> 
        </li>
    );
}
export default TodoListItem