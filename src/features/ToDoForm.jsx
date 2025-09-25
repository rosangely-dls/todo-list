import React, { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const StyledForm = styled.form`
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

const StyledButton = styled.button`
padding: 5px 10px;
margin-top: 10px;

&:disabled {
font-style: italic;
}
`;


function ToDoForm({ newToDo, setNewToDo, onAddToDo, isSaving  }) {
   const todoTitleInput = useRef(null);
   const [workingTodoTitle, setWorkingTodoTitle] = useState('');
   
    const handleAddToDo = (event) => {
        event.preventDefault();
        if (workingTodoTitle.trim()) {
            onAddToDo(workingTodoTitle);
            setWorkingTodoTitle('');
        }

        if (todoTitleInput.current) {
            todoTitleInput.current.focus();
        }
    };

    return (
     <StyledForm onSubmit={handleAddToDo}>
        <TextInputWithLabel 
        elementId="todoTitle"
        labelText="Todo"
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        />
        <StyledButton type="submit" disabled={workingTodoTitle.trim() === '' || isSaving}>
            {isSaving ? 'Saving...' : 'Add To-do'}
            </StyledButton>
    </StyledForm>
 );
}

export default ToDoForm; 