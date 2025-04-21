import TodoListItem from "./TodoListItem";

function TodoList({todoList, onCompleteTodo }){
    // const todos = [
    //     {id: 1, title: "review resources"},
    //     {id: 2, title: "take notes"},
    //     {id: 3, title: "code out app"},
    // ]
//<li key={todo.id}>{todo.title}</li>

const filteredTodoList  = todoList.filter (todo => !todo.isCompleted);

 return filteredTodoList.length === 0?(
    <p>Add todo above to get started</p>
 ): (
     <ul>{filteredTodoList.map(todo => <TodoListItem todo={todo} key={todo.id} onCompleteTodo = {onCompleteTodo }/>)}</ul>
 )
    
    
}

export default TodoList



