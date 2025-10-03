import React, { useEffect } from 'react';
import ToDoForm from '../features/ToDoForm';
import ToDoList from '../features/TodoList/ToDoList';
import TodosViewForm from '../features/TodosViewForm';
import { useSearchParams, useNavigate } from 'react-router-dom';


const TodosPage = ({
    todoListState,
    newToDo, setNewToDo,
    queryString, setQueryString,
    sortField, setSortField,
    sortDirection, setSortDirection,
    addToDo, completeTodo, updateTodo
}) => {

const [searchParams, setSearchParams] = useSearchParams();
const navigate = useNavigate();

const itemsPerPage = 15;

const currentPage = parseInt(searchParams.get('page') || '1', 10);

const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

const currentTodos = todoListState.toDoList.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage);

const totalPages = Math.ceil(todoListState.toDoList.length / itemsPerPage);

const handlePreviousPage = () => {
    if (currentPage > 1) {
        setSearchParams({ page: currentPage - 1 }); 
    }
};

const handleNextPage = () => {
    if (currentPage < totalPages) {
        setSearchParams({ page: currentPage + 1 });
    }
};

useEffect(() => {
    if (totalPages > 0) {
    if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
    }
    }
}, [currentPage, totalPages, navigate]);

    return (
        <div>
            <TodosViewForm
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            sortField={sortField}
            setSortField={setSortField}
            queryString={queryString}
            setQueryString={setQueryString}
            />

            <ToDoForm
            newToDo={newToDo}
            setNewToDo={setNewToDo}
            isSaving={todoListState.isSaving}
            onAddToDo={addToDo}
            />

            <ToDoList
            toDoList={currentTodos}
            isLoading={todoListState.isLoading}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
            />

        <div className="paginationControls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
             </div>
    );
};

export default TodosPage;