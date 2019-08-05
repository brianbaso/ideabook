import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Config from './config/config.json'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayFabClient from '../node_modules/playfab-sdk/Scripts/PlayFab/PlayFabClient';

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
let firestore = firebase.firestore();

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

PlayFabClient.settings.titleId = Config.playFabTitleId;

function doLoginWithCustomId() {
  var loginRequest = {
    TitleId: Config.playFabTitleId,
    CustomId: Config.testPlayerCustomId
  };

  PlayFabClient.LoginWithCustomID(loginRequest, loginCallback);
}

function loginCallback(error, result) {
    if (result !== null) {
        console.log("Successfully logged in.");
    } else if (error !== null) {
        console.log("Something went wrong with your first API call.");
        console.log("Here's some debug information:");
        console.log(compileErrorReport(error));
    }
}

export default function compileErrorReport(error) {
  if (error == null)
    return "";
  let fullErrors = error.errorMessage;
  for (let paramName in error.errorDetails)
    for (let msgIdx in error.errorDetails[paramName])
      fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
  return fullErrors;
}

// firebase.auth().createUserWithEmailAndPassword(testUser, testPassword);

// doLoginWithCustomId();
ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
