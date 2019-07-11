import { merge } from 'lodash';

import { RECEIVE_TODOS, RECEIVE_TODO } from '../actions/todoActions';

let nullState = { todos: [], loading: true };

export default todoReducer = (state = nullState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TODOS: {
            return Object.assign({}, { todos: action.todos, loading: false });
        }
        case RECEIVE_TODO: {
            const newTodos = state.todos;
            newTodos.push({title: action.todo.title});
            return merge({}, { todos: newTodos, loading: false });
        }
        default:
            return state;
    }
};
