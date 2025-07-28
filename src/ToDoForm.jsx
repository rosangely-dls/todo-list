import React from 'react';

function ToDoForm() {
 return (
    <form>
        <label htmlFor="todo-input">New ToDo:</label>
        <input type="text" id="todo-input" name="todo" />
        <button type="submit">Add Todo</button>
    </form>
 );
}

export default ToDoForm;