
import './App.css'
import './TodoList'
import './TodoForm'
import TodoList from './TodoList'
import TodoForm from './TodoForm'
import { useState } from 'react'


function App() {
 const [todoList, setTodoList] = useState([]);

 function addTodo(title){
  const newTodo =  { title, id: Date.now()};
 setTodoList([...todoList, newTodo]);
}
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo}/>
      {/* <p>{newTodo}</p> */}
      <TodoList todoList={todoList}/>
    </div>
  )
}

export default App
