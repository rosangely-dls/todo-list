import ToDoListItem from "./ToDoListItem";

function ToDoList({toDoList}) {
    return (
        <ul>
        {toDoList.map((todo, index) => (
            <ToDoListItem key={index} todo={todo} />
        ))}
      </ul>
    );
}

export default ToDoList;