import TodoListItem from "./TodoListItem";

function TodoList({todoList, onCompleteTodo, onUpdateTodo, isLoading}){
     if (isLoading) {
     return <p>Todo list loading...</p>;
    }

    const filteredTodoList  = todoList.filter (todo => !todo.isCompleted);
    
    return filteredTodoList.length === 0?(
        <p>Add todo above to get started</p>
        ): (
            <ul>{filteredTodoList.map(todo => <TodoListItem todo={todo} key={todo.id} onCompleteTodo = {onCompleteTodo } onUpdateTodo = {onUpdateTodo}/>)}</ul>
        ) 
}

export default TodoList