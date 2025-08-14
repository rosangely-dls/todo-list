import { useState } from "react";
import "./App.css";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";




function App() {
  const [newToDo, setNewToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);

function addToDo(title) {
  if (title.trim()) {
    const newToDo = {
      title: title,
      id: Date.now(),
    };
    setToDoList([...toDoList, newToDo]);
  } 
}

  return (
    <div>
      <h1>My To-Dos</h1>

      <ToDoForm
      newToDo={newToDo}
      setNewToDo={setNewToDo}
      onAddToDo={addToDo}
      /> 
      <ToDoList toDoList={toDoList} />
   </div>
  );
}

export default App;
