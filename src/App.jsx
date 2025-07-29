import "./App.css";
import "./ToDoList";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";


function App() {
  
  return (
    <div>
      <h1>My To-Dos</h1>
      <ToDoForm />
      <ToDoList />
    </div>
  );
}

export default App;
