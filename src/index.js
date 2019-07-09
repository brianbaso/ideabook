import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayFab from '../node_modules/playfab-sdk/Scripts/PlayFab/PlayFab';
import PlayFabClient from '../node_modules/playfab-sdk/Scripts/PlayFab/PlayFabClient';

// PlayFab Logic
function DoExampleLoginWithCustomID() {
    PlayFab.settings.titleId = "144";
    var loginRequest = {
        // Currently, you need to look up the correct format for this object in the API reference for LoginWithCustomID.
        TitleId: PlayFab.settings.titleId,
        CustomId: "GettingStartedGuide",
        CreateAccount: true
    };

    PlayFabClient.LoginWithCustomID(loginRequest, LoginCallback);
}

function DoLoginWithCustomID() {
    var loginRequest = {
      CustomId: "2112D4316A16FC4D",
      TitleId: 22E9182380FB7800
    };

    PlayFabClient.LoginWithCustomID(loginRequest, LoginCallback);
}

function LoginCallback(error, result) {
    if (result !== null) {
        console.log("Congratulations, you made your first successful API call!");
    } else if (error !== null) {
        console.log("Something went wrong with your first API call.");
        console.log("Here's some debug information:");
        console.log(CompileErrorReport(error));
    }
}

// This is a utility function we haven't put into the core SDK yet. Feel free to use it.
function CompileErrorReport(error) {
    if (error == null)
        return "";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
        for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
}

// Kick off the acutla login call
DoLoginWithCustomID();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
