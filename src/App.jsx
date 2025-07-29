
import "./App.css";
import ToDoList from "./ToDoList";
import { useState } from "react";


function App() {
  const [newToDo, setNewToDo] = useState(" ");
  const [toDoList, setToDoList] = useState([]);

  const handleAddToDo = () => {
    if (newToDo.trim()) {
      setToDoList([...toDoList, newToDo]);
      setNewToDo("");
    }
  };

  return (
    <div>
      <h1>My To-Dos</h1>
      
      <input
      type="text"
      value={newToDo}
      onChange={(e) => setNewToDo(e.target.value)}
      placeholder="Enter a new todo"
      />
      <button onClick={handleAddToDo}>Add</button>
      
      <p>{newToDo}</p>

      <ToDoList toDoList={toDoList} />
   </div>
  );
}

export default App;
