import React from 'react';

function ToDoForm({newToDo, setNewToDo, handleAddToDo }) {
 return (
    <form on onSubmit={(e) => { e.preventDefault(); handleAddToDo(); }}>
        <input
        type="text"
        value={newToDo}
        onChange={(e) => setNewToDo(e.target.value)}
        placeholder="Enter a new todo"
        />
        <button type="submit">Add Todo</button>
    </form>
 );
}

export default ToDoForm; 