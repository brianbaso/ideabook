import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Config from './config/config.json'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayFabClient from '../node_modules/playfab-sdk/Scripts/PlayFab/PlayFabClient';

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

function compileErrorReport(error) {
  if (error == null)
    return "";
  let fullErrors = error.errorMessage;
  for (let paramName in error.errorDetails)
    for (let msgIdx in error.errorDetails[paramName])
      fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
  return fullErrors;
}

doLoginWithCustomId();

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
