import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import Header from './shared/Header';
import TodosPage from './pages/TodosPage';
import { 
  todosReducer,
  actionTypes as todoActions,
  initialState as initialTodosState
        } from './reducers/todos.reducer';
import './App.css';
import styles from './App.module.css';

function App() {
  const location = useLocation();
  const [title, setTitle] = useState("Todo List");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Todo List");
        break;
        case "/about":
          setTitle("About");
          break;
          default:
            setTitle("Not Found");
    }
  }, [location.pathname]);


  const [todoListState, dispatch] = useReducer(todosReducer, initialTodosState);

  const [newToDo, setNewToDo] = useState('');
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
      dispatch({ type: todoActions.FETCH_TODOS });

      try {
        const requestUrl = encodeUrl();
        const resp = await fetch(requestUrl, {
          headers: {
            Authorization: token,
          }
        });

        if (!resp.ok) {
          throw new Error('Failed to fetch todos');
        }
        
        const data = await resp.json();
        dispatch({ type: todoActions.LOAD_TODOS, records: data.records });

       } catch (error) {
        dispatch({ type: todoActions.SET_LOAD_ERROR, error });
      }
    };

    fetchTodos();
}, [sortField, sortDirection, queryString]);

 async function addToDo(title) {
    if (!title.trim())  return;

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
          dispatch({ type: todoActions.START_REQUEST });

          const resp = await fetch(baseUrl, options);

          if (!resp.ok) {
            throw new Error('Failed to save the new todo');
          }

          const { records } = await resp.json();
          const savedTodo = {
            id: records[0].id,
            ...records[0].fields,
            isCompleted: records[0].fields.isCompleted || false,
          };

          const saved = { id: records[0].id, ...records[0].fields, isCompleted: !!records[0].fields?.isCompleted };
        dispatch({ type: todoActions.ADD_TODO, payload: saved });
      
        } catch (error) {
        dispatch({ type: todoActions.SET_LOAD_ERROR, error });
      } finally {
        dispatch({ type: todoActions.END_REQUEST });
      }
     }
    

 const completeTodo = async (todoId) => {
  const originalTodo = todoListState.toDoList.find((todo) => todo.id === todoId);

  dispatch({ type: todoActions.COMPLETE_TODO, id: todoId });

  try {
const payload = {
  records: [
    {
      id: todoId,
      fields: {
        isCompleted: true,
      },
    },
  ],
};

const options = {
  method: 'PATCH',
  headers: {
    Authorization: token, 
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
};

  const resp = await fetch(baseUrl, options);

  if (!resp.ok) {
    throw new Error('Failed to mark todo as complete');
  }

} catch (error) {
  console.error('Error completing todo:', error);
  dispatch({ type: todoActions.REVERT_TODO, editedTodo: originalTodo });
  }
 };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoListState.toDoList.find((todo) => todo.id === editedTodo.id);

    dispatch({ type: todoActions.UPDATE_TODO, editedTodo });
    
    try {
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
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  const resp = await fetch(baseUrl, options);

  if (!resp.ok) {
      throw new Error('Failed to update the todo');
    }
    
  } catch (error) {
    console.error('Error updating todo:', error);
    dispatch({ type: todoActions.REVERT_TODO, editedTodo: originalTodo });
   }
  };

  return (
    
    <div className={styles.appContainer}> 
      <Header title={title} />
      <Routes>
        <Route
          path="/"
          element={
      <TodosPage
      todoListState={todoListState}
      newToDo={newToDo} setNewToDo={setNewToDo}
      queryString={queryString} setQueryString={setQueryString}
      sortField={sortField} setSortField={setSortField}
      sortDirection={sortDirection} setSortDirection={setSortDirection}
      addToDo={addToDo}
      completeTodo={completeTodo}
      updateTodo={updateTodo}
        /> 
        }
        />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/*" element={<h1>Not Found</h1>} />
        </Routes>
    {todoListState.isLoading && <p>Loading...</p>}
    {todoListState.errorMessage && (
      <div className={styles.errorMessage}>
        <hr />
        <p>{todoListState.errorMessage}</p>
        <button onClick={() => dispatch({ type: todoActions.CLEAR_ERROR })}>
          Dismiss
          </button>
        </div>
    )}
    </div>
  );
}

export default App;
