import { useState } from "react";
import "./App.css";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";



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

      <ToDoForm
      newToDo={newToDo}
      setNewToDo={setNewToDo}
      handleAddToDo={handleAddToDo}
      />
      
      <p>{newToDo}</p>

      <ToDoList toDoList={toDoList} />
   </div>
  );
}

export default App;
