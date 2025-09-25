import { useState, useEffect, useCallback } from 'react';
import './App.css';
import styles from './App.module.css';
import ToDoList from './features/TodoList/ToDoList';
import ToDoForm from './features/ToDoForm';
import TodosViewForm from './features/TodosViewForm';



function App() {
  const [newToDo, setNewToDo] = useState('');
  const [toDoList, setToDoList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [queryString, setQueryString] = useState('');

  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
 
  const baseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  
  const encodeUrl = useCallback(()=> {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';

  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}", title)`;
  }
  return encodeURI(`${baseUrl}?${sortQuery}${searchQuery}`);
}, [sortField, sortDirection, baseUrl, queryString]);

  const token = `Bearer ${import.meta.env.VITE_PAT}`;



  const updateSortField = (newField) => {
    setSortField(newField);
  };

  const updateSortDirection = (newDirection) => {
    setSortDirection(newDirection);
  };
  
const fetchSortedData = async () => {
    try {
      const requestUrl = encodeUrl();
      const response = await fetch(requestUrl, {
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      };

      try {
        const requestUrl = encodeUrl()
        const resp = await fetch(requestUrl, options);

        if (!resp.ok) {
          throw new Error('Failed to fetch todos');
        }
        
        const data = await resp.json();

        const todos = data.records.map(record => ({
            id: record.id,
            title: record.fields.title,
            isCompleted: record.fields.isCompleted || false,
          }));


        setToDoList(todos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
}, [sortField, sortDirection, queryString]);

 async function addToDo(title) {
    if (title.trim()) {
      const newToDo = {
        fields: {
        title: title,
        isCompleted: false
        }
      };

      const payload = {
        records: [newToDo]
      };

      const options = {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      };

        try {
          setIsSaving(true);

          const resp = await fetch(baseUrl, options);

          if (!resp.ok) {
            throw new Error('Failed to save the new todo');
          }

          const { records } = await resp.json();
          const savedTodo = {
            id: records[0].id,
            ...records[0].fields
          };

          if (!records[0].fields.isCompleted) {
            savedTodo.isCompleted = false;
          }

          setToDoList(prevToDoList => [...prevToDoList, savedTodo]);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setIsSaving(false);
      }
      }
    }

 async function completeTodo(todoId) {
  const originalTodo = toDoList.find((todo) => todo.id === todoId);

  setToDoList((prevToDoList) =>
  prevToDoList.map((todo) =>
  todo.id === todoId ? { ...todo, isCompleted: true } : todo 
)
);

const payload = {
  records: [
    {
      id: todoId,
      fields: {
        title: originalTodo.title,
        isCompleted: true,
      },
    },
  ],
};

const options = {
  method: 'PATCH',
  headers: {
    'Authorization': token, 
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
};

try {
  const resp = await fetch(baseUrl, options);

  if (!resp.ok) {
    throw new Error('Failed to update the todo');
  }

} catch (error) {
  console.error(error);
  setErrorMessage(`${error.message}. Reverting todo...`);

  setToDoList((prevToDoList) =>
  prevToDoList.map((todo) =>
  todo.id === originalTodo.id ? originalTodo : todo
)
);
}
 }

  async function updateTodo(editedTodo) {
    const originalTodo = toDoList.find((todo) => todo.id === editedTodo.id);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
  
  const options = {
    method: 'PATCH',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    setIsSaving(true);

    const resp = await fetch(baseUrl, options);

    if (!resp.ok) {
      throw new Error('Failed to update the todo');
    }

    const data = await resp.json();
    const updatedTodo = {
      id: data.records[0].id,
      ...data.records[0].fields,
    };

    setToDoList((prevToDoList) =>
    prevToDoList.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo
  )
);
  } catch (error) {
    console.error(error);
    setErrorMessage(`${error.message}. Reverting todo...`);

    setToDoList((prevToDoList) =>
    prevToDoList.map((todo) =>
    todo.id === originalTodo.id ? originalTodo : todo
  )
);
  } finally {
    setIsSaving(false);
  }
}

  return (
    <div>
      <h1 className={styles.header}>My To-Dos</h1>
      <TodosViewForm
      sortDirection={sortDirection}
      setSortDirection={setSortDirection}
      sortField={sortField}
      setSortField={setSortField}
      queryString={queryString}
      setQueryString={setQueryString}
      />

      <ToDoForm 
      newToDo={newToDo} 
      setNewToDo={setNewToDo} 
      onAddToDo={addToDo}
      isSaving={isSaving}
      />
      <ToDoList 
      toDoList={toDoList} 
      onCompleteTodo={completeTodo} 
      onUpdateTodo={updateTodo}
      isLoading={isLoading}  
      />

  <hr /> 
    {isLoading && <p>Loading...</p>}
    {errorMessage && (
      <div>
        <hr />
        <p>{errorMessage}</p>
        <button onClick={() => setErrorMessage('')}>Dismiss</button>
        </div>
    )}
    </div>
  );
}

export default App;
