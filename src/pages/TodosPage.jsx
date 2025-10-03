import React from 'react';
import ToDoForm from '../features/ToDoForm';
import ToDoList from '../features/TodoList/ToDoList';
import TodosViewForm from '../features/TodosViewForm';

const TodosPage = ({
    todoListState,
    newToDo, setNewToDo,
    queryString, setQueryString,
    sortField, setSortField,
    sortDirection, setSortDirection,
    addToDo, completeTodo, updateTodo
}) => {
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
            toDoList={todoListState.toDoList}
            isLoading={todoListState.isLoading}
            onCompleteTodo={completeTodo}
            onUpdateTodo={updateTodo}
            />
        </div>
    );
};

export default TodosPage;