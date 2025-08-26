import React, { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

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
        <TextInputWithLabel 
        elementId="todoTitle"
        labelText="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        />
        <button type="submit" disabled={workingTodoTitle.trim() === ''}>
            Add To-do
            </button>
    </form>
 );
}

export default ToDoForm; 