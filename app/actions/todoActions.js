export const RECEIVE_TODOS = "RECEIVE_TODOS";

import Data from '../../assets/sample.json';
// import database from '../config/firebase';

export const receiveTodos = (todos) => (
    {
        type: RECEIVE_TODOS,
        todos
    }
)

export const fetchTodos = () => (
    (dispatch) => {
        // const scores = [];
        // database.ref().orderByChild("score").limitToLast(3).on("value", function (snapshot) {
        //     snapshot.forEach(function (childSnapshot) {
        //         const name = childSnapshot.val().name;
        //         const score = childSnapshot.val().score;
        //         scores.push({ name, score });
        //     });
        // })
        setTimeout(() => {
            const data = Data.instructions;
            dispatch(receiveTodos(data));
            // dispatch(receiveTodos(scores))
        }, 2000)
    }
)