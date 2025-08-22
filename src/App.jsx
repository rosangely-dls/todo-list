import { useState } from 'react';
import './App.css';
import ToDoList from './features/TodoList/ToDoList';
import ToDoForm from './features/ToDoForm';

function App() {
  const [newToDo, setNewToDo] = useState('');
  const [toDoList, setToDoList] = useState([]);

  function addToDo(title) {
    if (title.trim()) {
      const newToDo = {
        title: title,
        id: Date.now(),
        isCompleted: false,
      };
      setToDoList([...toDoList, newToDo]);
    }
  }

  function completeTodo(todoId) {
    const updatedToDos = toDoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: true };
      }
      return todo;
    });
    setToDoList(updatedToDos);
  }

  return (
    <div>
      <h1>My To-Dos</h1>

      <ToDoForm newToDo={newToDo} setNewToDo={setNewToDo} onAddToDo={addToDo} />
      <ToDoList toDoList={toDoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

export default App;
