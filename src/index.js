import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayFabClient from '../node_modules/playfab-sdk/Scripts/PlayFab/PlayFabClient';

PlayFabClient.settings.titleId = '6DE2D';

function DoLoginWithCustomID() {
    var loginRequest = {
      TitleId: '6DE2D',
      CustomId: '2112D4316A16FC4D'
    };

    PlayFabClient.LoginWithCustomID(loginRequest, SaveUserData);
}

function LoginCallback(error, result) {
    if (result !== null) {
        console.log("Successfully logged in.");
    } else if (error !== null) {
        console.log("Something went wrong with your first API call.");
        console.log("Here's some debug information:");
        console.log(CompileErrorReport(error));
    }
}

// This is a utility function we haven't put into the core SDK yet. Feel free to use it.
function CompileErrorReport(error) {
    if (error == null)
        return "error is null";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
        for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
}

function SaveUserDataCallback(error, result) {
  if (result !== null) {
      console.log('Result', result);
  } else if (error !== null) {
      console.log("Something went wrong with your SaveUserData call.");
      console.log("Here's some debug information:");
      console.log(CompileErrorReport(error));
  }
}

function SaveUserData() {
    var requestBody = {
      Data: {testKey: "testValue"},
      Permission: "Private"
    };

    try {
      // debugger;
      PlayFabClient.UpdateUserData(requestBody, SaveUserDataCallback);
      // console.log(UpdateUserDataResult);
    } catch(e) {
      CompileErrorReport(e);
      console.log(e);
    }
}

// Kick off the actual login call
DoLoginWithCustomID();
// SaveUserData();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
