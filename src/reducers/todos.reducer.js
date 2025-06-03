//Actions
export const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions 
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
};

//Create Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
//fetchTodos
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
//loadTodos
    case actions.loadTodos:
      return {
        ...state,
        todoList: action.records.map((record)=>{
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        }),
        isLoading: false,
      };
//setLoadError
    case actions.setLoadError:
        return{
            ...state,
            errorMessage: action.payload,
            isLoading: false,
            isSaving: false,
        };
//startRequest
    case actions.startRequest:
        return{
            ...state,
            isSaving: true,
        };
//addTodo
    case actions.addTodo:{
        const record = action.payload[0];
        const savedTodo = {
        id: record.id,
        ...record.fields,
        };
        if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
         }

        return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
        };
    }
//endRequest
    case actions.endRequest:
        return{
            ...state,
            isLoading: false,
            isSaving: false,
        };
//revertTodo
    case actions.revertTodo:{
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );

      return {
        ...state,
        todoList: updatedTodos,
      };
    }
// fall through to updateTodo //updateTodo
    case actions.updateTodo:{
              
            const updatedTodos = state.todoList.map((todo) =>
            todo.id === action.payload.id ? action.payload : todo
            );

            const updatedState = {
                ...state,
                todoList: updatedTodos, 
            };
        if(action.error){
            updatedState.errorMessage = action.error.message;
        }
      return updatedState;
    }
//completeTodo
    case actions.completeTodo:{
            const updatedTodos = state.todoList.map((todo) =>
            todo.id === action.payload.id ? { ...todo, isCompleted: true } : todo
            );
            return{
                ...state,
                todoList: updatedTodos, 
            };
        }
//clearError
    case actions.clearError:
        return{
            ...state,
            errorMessage: '',
        };
  }
}

//State
export const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage: '',
}

export default reducer