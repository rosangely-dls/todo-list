import { useState, useEffect } from "react";
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';
import styles from './ToDoListItem.module.css';

function ToDoListItem({ todo, onCompleteTodo, onUpdateTodo }) {

    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    useEffect(() => {
        setWorkingTitle(todo.title);
    }, [todo]);

    const handleCancel = () => {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    };

    const handleEdit = (event) => {
        setWorkingTitle(event.target.value);
    };

    const handleCheckboxChange = () => {
        onCompleteTodo(todo.id);
    };

    const enableEditing = () => {
        setIsEditing(true);
    };

    function handleUpdate(event) {
        if (!isEditing) return;
        event.preventDefault();
        onUpdateTodo({...todo, title: workingTitle });
        setWorkingTitle(todo.title);
        setIsEditing(false);
    }

    return (
    <li className={styles.item}>
        <form onSubmit={handleUpdate}>
            {isEditing ? (
                <>
                <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
                <button type="submit" onClick={handleUpdate}>
                    Update
                </button>
                </>
            ) : (
                <>
                <label>
                    <input
                    type="checkbox"
                    id={`checkbox${todo.id}`}
                    checked={todo.isCompleted}
                    onChange={handleCheckboxChange}
                    />
                </label>
                <span onClick={enableEditing}>{todo.title}</span>
                </>
            )}
        </form>
    </li>
    );
}

export default ToDoListItem;