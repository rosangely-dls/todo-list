import React from 'react';

function ToDoForm() {
 return (
    <form>
        <label htmlFor="todoTitle">Todo:</label>
        <input type="text" id="todoTitle" name="todo" />
        <button type="submit">Add Todo</button>
    </form>
 );
}

export default ToDoForm;