import React, { useRef } from 'react';

function ToDoForm({newToDo, setNewToDo, onAddToDo }) {
   const todoTitleInput = useRef(null);
   
    const handleAddToDo = (event) => {
        event.preventDefault();
        console.dir(event.target.title);
    const title = event.target.title.value = "";
    onAddToDo(newToDo);
    setNewToDo("");


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
        value={newToDo}
        onChange={(e) => setNewToDo(e.target.value)}
        placeholder="Enter a new todo"
        />
        <button type="submit">Add To-do</button>
    </form>
 );
}

export default ToDoForm; 