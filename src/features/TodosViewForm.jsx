import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    padding: 10px;
`;


const TodosViewForm = ({ sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString }) => {
    const[localQueryString, setLocalQueryString] = useState(queryString);

    useEffect(() => {
    const debounce = setTimeout(() => {
        setQueryString(localQueryString);
    }, 500);

    return () => {
        clearTimeout(debounce);
    };
}, [localQueryString, setQueryString]);

    const preventRefresh = (e) => {
    e.preventDefault();
 };    
    
    return (
        <StyledForm onSubmit={preventRefresh}>
            <div>
             <label>Search todos:</label>  
             <input
             type="text"
             value={localQueryString}
             onChange={(e) => setLocalQueryString(e.target.value)} 
             />
             <button type="button" onClick={() => setLocalQueryString('')}>Clear</button>
             </div>
             <div>
<label htmlFor="sortField">Sort by</label>
<select 
    id="sortField" 
    name="sortField" 
    value={sortField} 
    onChange={(e) => setSortField(e.target.value)}
    >
    <option value="title">Title</option>
    <option value="createdTime">Time added</option>
</select>

<label htmlFor="sortDirection">Direction</label>
<select 
id="sortDirection" 
name="sortDirection" 
value={sortDirection}
onChange={(e) => setSortDirection(e.target.value)}
>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
</select>
            </div>
        </StyledForm>      
    );
};

export default TodosViewForm;