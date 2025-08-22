import React, { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function ToDoListItem({ todo, onCompleteTodo, onUpdateTodo }) {

    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        handleUpdate();
    };

    const handleCancel = () => {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    };

    const handleEdit = (event) => {
        setWorkingTitle(event.target.value);
    };

    const handleUpdate =(event) => {
        if (!isEditing) return;
        event.preventDefault();

        onUpdateTodo({...todo, title: workingTitle });

        setIsEditing(false);
    };

    return (
    <li>
            <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onCompleteTodo(todo.id)} />
            {isEditing ? (
                <form onSubmit={handleUpdate}>

                <TextInputWithLabel
                elementId={`todo-${todo.id}`}
                labelText="Edit Todo"
                value={workingTitle}
                onChange={handleEdit}
                onBlur={handleSave}
                autoFocus
                />
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
                <button type="submit">
                    Update
                </button>
                </form>
            ) : (
                <span onDoubleClick={toggleEditMode}>{todo.title}</span>
            )}
            <button onClick={isEditing ? handleUpdate : toggleEditMode}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
    </li>
    );
}

export default ToDoListItem;