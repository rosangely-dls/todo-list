import { useReducer } from 'react';
import { todosReducer, initialState, actionTypes } from './reducers/todos.reducer';
import './App.css';
import styles from './App.module.css';
import ToDoList from './features/TodoList/ToDoList';
import ToDoForm from './features/ToDoForm';
import TodosViewForm from './features/TodosViewForm';



function App() {
  const [state, dispatch] = useReducer(todosReducer, initialState);

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
      dispatch({ type: actionTypes.SET_IS_LOADING, payload: true });

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


        dispatch({ type: actionTypes.SET_TODO_LIST, payload: todos});
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR_MESSAGE, payload: error.message });
      } finally {
        dispatch({ type: actionTypes.SET_IS_LOADING, payload: false });
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
          dispatch({ type: actionTypes.SET_IS_SAVING, payload: true });

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

          dispatch({ type: actionTypes.SET_TODO_LIST, payload: [...state.toDoList, savedTodo] });
      } catch (error) {
        console.error(error);
        dispatch({ type: actionTypes.SET_ERROR_MESSAGE, payload: error.message });
      } finally {
        dispatch({ type: actionTypes.SET_IS_SAVING, payload: false });
      }
      }
    }

 const completeTodo = async (todoId) => {
  const originalTodo = state.toDoList.find((todo) => todo.id === todoId);

  dispatch({ type: actionTypes.COMPLETE_TODO, payload: todoId });

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
  dispatch({ type: actionTypes.SET_ERROR_MESSAGE, payload: `${error.message}. Reverting todo...` });

  dispatch({ type: actionTypes.UPDATE_TODO, payload: originalTodo});
}
 };

  const updateTodo = async (editedTodo) => {
    const originalTodo = state.toDoList.find((todo) => todo.id === editedTodo.id);

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
    dispatch({ type: actionTypes.SET_IS_SAVING, payload: true });

    const resp = await fetch(baseUrl, options);

    if (!resp.ok) {
      throw new Error('Failed to update the todo');
    }

    const data = await resp.json();
    const updatedTodo = {
      id: data.records[0].id,
      ...data.records[0].fields,
    };

    dispatch({ type: actionTypes.UPDATE_TODO, payload: updatedTodo });
  } catch (error) {
    console.error(error);
    dispatch({ type: actionTypes.SET_ERROR_MESSAGE, payload: `${error.message}. Reverting todo...` });

    dispatch({ type: actionTypes.UPDATE_TODO, payload: originalTodo });
  } finally {
    dispatch({ type: actionTypes.SET_IS_SAVING, payload: false });
  }
};

  return (
    <div className={styles.appContainer}> 
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
      isSaving={state.isSaving}
      />
      <ToDoList 
      toDoList={state.toDoList} 
      onCompleteTodo={completeTodo} 
      onUpdateTodo={updateTodo}
      isLoading={state.isLoading}  
      />

  <hr /> 
    {state.isLoading && <p>Loading...</p>}
    {state.errorMessage && (
      <div className={styles.errorMessage}>
        <hr />
        <p>{state.errorMessage}</p>
        <button onClick={() => dispatch({ type: actionTypes.SET_ERROR_MESSAGE, payload: ' '})}>
          Dismiss
          </button>
        </div>
    )}
    </div>
  );
}

export default App;
