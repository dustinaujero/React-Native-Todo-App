export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const RECEIVE_TODO = "RECEIVE_TODO";


import Data from '../../assets/sample.json';

export const receiveTodos = (todos) => (
    {
        type: RECEIVE_TODOS,
        todos
    }
)
export const receiveTodo = (todo) => (
    {
        type: RECEIVE_TODO,
        todo
    }
)




import firebase from 'firebase';
require('firebase/database');
var config = {
    apiKey: "AIzaSyDHc0SEjzsL7bjcomU3xDeJacqlUIXHJkU",
    authDomain: "todo-d1cc4.firebaseapp.com",
    databaseURL: "https://todo-d1cc4.firebaseio.com",
    projectId: "todo-d1cc4",
    storageBucket: "todo-d1cc4.appspot.com",
    messagingSenderId: "929181652003",
    appId: "1:929181652003:web:d72f715162678db3"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const createTodo = (title) => (
    dispatch => {
        const that = this;
        firebase.database().ref('Todos/').push({ title })
            .then((data) => {
                //success callback
                console.log('data ', data)
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            });
            // setTimeout(() => {
            //     dispatch(receiveTodo({ title }));
            // }, 2000)
        
        }
        
)

export const fetchTodos = () => (
    (dispatch) => {
        const todos = [];
        firebase.database().ref("Todos/").on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const title = childSnapshot.val().title;
                const description = childSnapshot.val().description;
                todos.push({ title, description });
            });
        })
        // dispatch(receiveTodos(todos));
        setTimeout(() => {
            // const data = Data.instructions;
            dispatch(receiveTodos(todos));
        }, 2000)
    }
)