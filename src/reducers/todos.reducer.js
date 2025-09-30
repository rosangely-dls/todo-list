export const initialState = {
    toDoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage: '',
};

export const actionTypes = {
    SET_TODO_LIST: 'SET_TODO_LIST',
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_IS_SAVING: 'SET_IS_SAVING',
    SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE',
    UPDATE_TODO: 'UPDATE_TODO',
    COMPLETE_TODO: 'COMPLETE_TODO',
    REVERT_TODO: 'REVERT_TODO',
    FETCH_TODOS: 'FETCH_TODOS',
    LOAD_TODOS: 'LOAD_TODOS',
    START_REQUEST: 'START_REQUEST',
    ADD_TODO: 'ADD_TODO',
    END_REQUEST: 'END_REQUEST',
    SET_LOAD_ERROR: 'SET_LOAD_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

export const todosReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_TODO_LIST:
            return { ...state, toDoList: action.payload };
        case actionTypes.SET_IS_LOADING: 
            return { ...state, isLoading: action.payload };
        case actionTypes.SET_IS_SAVING:
            return { ...state, isSaving: action.payload };
        case actionTypes.SET_ERROR_MESSAGE: 
            return { ...state, errorMessage: action.payload };
        case actionTypes.REVERT_TODO:
        
        case actionTypes.UPDATE_TODO: {
            const updatedTodos = state.toDoList.map(todo =>
                todo.id === action.editedTodo.id ? action.editedTodo : todo
            );

            const updatedState = {
                ...state,
                toDoList: updatedTodos,
            };

            if (action.error) {
                updatedState.errorMessage = action.error.message;
            }
            return updatedState;
                
            }

        case actionTypes.COMPLETE_TODO: {
            const updatedTodos = state.toDoList.map(todo =>
               todo.id === action.id ? { ...todo, isCompleted: true } : todo 
            );
        
            return {
                ...state,
                toDoList: updatedTodos,
            };
        }

        case actionTypes.FETCH_TODOS:
            return {
                ...state,
                isLoading: true,
            };

        case todoActions.LOAD_TODOS:
            return {
                ...state,
                toDoList: action.records.map(record => ({
                   id: record.id,
                   title: record.fields.title,
                    isCompleted: record.fields.isCompleted || false,
                })),
                isLoading: false,
            };

        case actionTypes.SET_LOAD_ERROR:
            return {
                ...state,
                errorMessage: action.error.message,
                isLoading: false,
            };

        case actionTypes.START_REQUEST:
            return {
                ...state,
                isSaving: true,
            };
        case actionTypes.ADD_TODO: {
            const savedTodo = {
                id: action.payload.id,
                title: action.payload.fields.title,
                isCompleted: action.payload.fields.isCompleted || false,
            }; 
           
            return {
            ...state,
            toDoList: [...state.toDoList, savedTodo],
            isSaving: false,
        };
    }

        case actionTypes.END_REQUEST:
            return {
                ...state,
                isLoading: false,
                isSaving: false,
            };

        case actionTypes.SET_LOAD_ERROR:
            return {
                ...state,
                errorMessage: action.error.message,
                isLoading: false,
            };

        case actionTypes.CLEAR_ERROR: 
            return {
                ...state,
                errorMessage: '',
            };

        default:
            return state;
    }
};