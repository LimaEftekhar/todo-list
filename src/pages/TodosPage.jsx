import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';

function TodosPage({
  addTodo,
  completeTodo,
  updateTodo,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
  todoState,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(todoState.todoList.length / itemsPerPage);

  function handlePreviousPage() {
    const prevPage = Math.max(currentPage - 1, 1);
    setSearchParams({ page: prevPage.toString() });
  }

  function handleNextPage() {
    const nextPage = Math.min(currentPage + 1, totalPages);
    setSearchParams({ page: nextPage.toString() });
  }

  useEffect(() => {
    if (totalPages > 0) {
      if (
        isNaN(currentPage) ||
        currentPage < 1 ||
        currentPage > totalPages
      ) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

      <TodoList
        todoList={todoState.todoList.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage)}
        isLoading={todoState.isLoading}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />

      <div className="paginationControls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <hr />

      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </>
  );
}

export default TodosPage;