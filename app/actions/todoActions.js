export const RECEIVE_TODOS = "RECEIVE_TODOS";

import Data from '../sample.json';

export const receiveTodos = (todos) => (
    {
        type: RECEIVE_TODOS,
        todos
    }
)

export const fetchTodos = () => (
    (dispatch) => {
        setTimeout(() => {
            const data = Data.instructions;
            dispatch(receiveTodos(data))
        }, 2000)
    }
)