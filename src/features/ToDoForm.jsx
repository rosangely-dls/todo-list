import React, { useState, useRef } from 'react';

function ToDoForm({ onAddToDo }) {
   const todoTitleInput = useRef(null);
   const [workingTodoTitle, setWorkingTodoTitle] = useState('');
   
    const handleAddToDo = (event) => {
        event.preventDefault();
        if(workingTodoTitle.trim()) {
            onAddToDo(workingTodoTitle);
            setWorkingTodoTitle('');
        }

        if (todoTitleInput.current) {
            todoTitleInput.current.focus();
        }
    };

    return (
     <form onSubmit={handleAddToDo}>
        <input 
        ref={todoTitleInput}
        name="title"
        type="text"
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        placeholder="Enter a new todo"
        />
        <button type="submit" disabled={workingTodoTitle.trim() === ''}>
            Add To-do
            </button>
    </form>
 );
}

export default ToDoForm; 