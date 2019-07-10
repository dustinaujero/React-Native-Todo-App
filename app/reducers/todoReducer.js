import { merge } from 'lodash';

import { RECEIVE_TODOS } from '../actions/todoActions';

let nullState = { todos: [], loading: true };

export default todoReducer = (state = nullState, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TODOS:
            return merge({}, { todos: action.todos, loading: false });
        default:
            return state;
    }
};
