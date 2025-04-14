import TodoListItem from "./TodoListItem";

function TodoList({todoList}){
    // const todos = [
    //     {id: 1, title: "review resources"},
    //     {id: 2, title: "take notes"},
    //     {id: 3, title: "code out app"},
    // ]
//<li key={todo.id}>{todo.title}</li>
    return <ul>{todoList.map(todo => <TodoListItem todo={todo} key={todo.id}/>)}</ul>
}

export default TodoList



