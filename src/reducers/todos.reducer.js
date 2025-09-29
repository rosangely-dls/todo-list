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
        case actionTypes.UPDATE_TODO: 
            return {
                ...state,
                toDoList: state.toDoList.map(todo => 
                    todo.id === action.payload.id ? action.payload : todo   
                ),
            };
        case actionTypes.COMPLETE_TODO: 
            return {
                ...state,
                toDoList: state.toDoList.map(todo =>
                    todo.id === action.payload ? { ...todo, isCompleted: true } : todo
                ),
            };
        default:
            return state;
    }
};