import ToDoListItem from "./ToDoListItem";

function ToDoList() {
    const todos = [
    { id: 1, title: "review resources" },
    { id: 2, title: "take notes" },
    { id: 3, title: "code out app" },
  ];
    return (
        <ul>
        {todos.map(todo => (
            <ToDoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    );
}

export default ToDoList;