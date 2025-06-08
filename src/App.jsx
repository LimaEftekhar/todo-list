import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import TodosViewForm from './features/TodosViewForm';
import { useReducer, useCallback, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import styles from './App.module.css';
import todosReducer, {
  actions as todoActions,
  initialState as initialTodosState,

}from './reducers/todos.reducer';
import TodosPage from './pages/TodosPage';
import Header from './shared/Header';
import About from './pages/About';
import NotFound from './pages/NotFound';


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;



function App() {
  const [todoState , dispatch] = useReducer(todosReducer, initialTodosState);
  const { isLoading, todoList, errorMessage } = todoState;
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString ] = useState('');
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');

  
  const encodeUrl = useCallback(()=> {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';

    if(queryString){
      searchQuery = `&filterByFormula=SEARCH("${queryString}",title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`)
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
  switch (location.pathname) {
    case '/':
      setPageTitle('Todo List');
      break;
    case '/about':
      setPageTitle('About');
      break;
    default:
      setPageTitle('Not Found');
  }
}, [location]);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos});
      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };
      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        const { records } = await resp.json();
      dispatch({type: todoActions.loadTodos, records: records});
      } catch (error) {
       dispatch({type: todoActions.setLoadError, payload: error.message});
      
      }
    };
    fetchTodos();
  }, [encodeUrl]);

  const addTodo = async (newTodo) => {
    dispatch({ type: todoActions.startRequest });
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, payload: records }); 
    } catch (error) {
      dispatch({type: todoActions.setLoadError, payload: error.message});
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  async function completeTodo(id) {
    dispatch({ type: todoActions.startRequest });
    const originalTodo = todoList.find((todo) => todo.id === id);
    dispatch({ type: todoActions.completeTodo, payload: { id } });

    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      
    } catch (error) {
      dispatch({type: todoActions.setLoadError, payload: error.message});
      dispatch({ type: todoActions.revertTodo, payload: originalTodo });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  async function updateTodo(editedTodo) {
    dispatch({ type: todoActions.startRequest });
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    dispatch({ type: todoActions.updateTodo, payload: editedTodo });

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(encodeUrl(), options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
     
    } catch (error) {
      dispatch({type: todoActions.setLoadError, payload: error.message});
      dispatch({ type: todoActions.revertTodo, payload: originalTodo });
    
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  }

  return (
    <div className={styles.container}>
      < Header title={pageTitle}/>
      
      
      
      {errorMessage && (
        <div className={styles.error}>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>Dismiss</button>
        </div>
      )}
      <Routes>
        <Route path="/" element={
          <TodosPage  
          
          addTodo ={addTodo}
          completeTodo = {completeTodo}
          updateTodo= {updateTodo}
          sortDirection = {sortDirection}
          setSortDirection = {setSortDirection}
          sortField = {sortField}
          setSortField= {setSortField}
          queryString = {queryString}
          setQueryString = {setQueryString}
          todoState = {todoState}
         />
        }
        />
        <Route path='/About' element = {<About/>}/>
        <Route path='*' element = {<NotFound/>}/>
      </Routes>

      
    </div>
  );
  
}

export default App;