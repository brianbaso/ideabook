import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

/*

Data modeling

Users:            users/{userId}
Private ideas:    users/{userId}/ideas/{ideaId}
Posts:            posts/{postId}
Comments:         posts/{postId}/comments/{commentId}

---

Security Rules

Private ideas:    Only readable by user who created
Posts:            Readable by everyone
Comments:         Readable by everyone

Pseudo-code: allow write if: restaurant.roles[userId] = "editor"

*/

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc_mawcQi3DNxU8CFxCj0aHCMXfOxFmI8",
  authDomain: "neuroquery-abb3a.firebaseapp.com",
  databaseURL: "https://neuroquery-abb3a.firebaseio.com",
  projectId: "neuroquery-abb3a",
  storageBucket: "neuroquery-abb3a.appspot.com",
  messagingSenderId: "130609407519",
  appId: "1:130609407519:web:9efbaf033c8eb6b5"
};

firebase.initializeApp(firebaseConfig);
// let firestore = firebase.firestore();

let testUser = "brianl@gmail.com";
let testPassword = "Testpassword123!"

// firebase.auth().createUserWithEmailAndPassword(testUser, testPassword).then((response) => {
//   console.log(testUser, 'successfully created.');
// }).catch((error) => {
//   if (error !== null) {
//     console.log('ERROR:', error.code, '-', error.message);
//   }
// })

firebase.auth().signInWithEmailAndPassword(testUser, testPassword).then((response) => {
  console.log(testUser, 'successfully signed in.');
}).catch((error) => {
  if (error !== null) {
    console.log('ERROR:', error.code, '-', error.message);
  }
})

// firebase.auth().createUserWithEmailAndPassword(testUser, testPassword);
ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
