import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCoIxc_K2Dop9VMXS4B6qhBUyDnuQBQ33c",
    authDomain: "blockrunner-8c971.firebaseapp.com",
    databaseURL: "https://blockrunner-8c971.firebaseio.com",
    projectId: "blockrunner-8c971",
    storageBucket: "blockrunner-8c971.appspot.com",
    messagingSenderId: "1032613884407"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const storage = firebase.storage();