import React from 'react';
import ToDoListItem from './ToDoListItem';

function ToDoList({ toDoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = toDoList.filter((todo) => !todo.isCompleted);

  return (
    <div>
      {isLoading ? (
        <p>Todo list loading...</p>
      ) : (
      filteredTodoList.length === 0 ? (
        <p>Add a todo to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <ToDoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )
      )}
    </div>
  );
}

export default ToDoList;
