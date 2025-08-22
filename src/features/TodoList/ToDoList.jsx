import ToDoListItem from './ToDoListItem';

function ToDoList({ toDoList, onCompleteTodo }) {
  const filteredTodoList = toDoList.filter((todo) => !todo.isCompleted);

  return (
    <div>
      {filteredTodoList.length === 0 ? (
        <p>Add a todo to get started</p>
      ) : (
        <ul>
          {filteredTodoList.map((todo) => (
            <ToDoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ToDoList;
