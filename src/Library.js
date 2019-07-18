import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import Config from './config/config.json'
import PlayFabClient from '../node_modules/playfab-sdk/Scripts/PlayFab/PlayFabClient';

export default class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: []
    };
  }

  componentDidMount() {
    let userData = this.getUserData();
    this.setState({ userData : userData });
  }

  getUserData() {
    const requestBody = {
      Data: {
        PlayFabId: Config.testPlayerTitleId,
      }
    };

    try {
      let response = PlayFabClient.GetUserData(requestBody, this.getUserDataCallback);
      console.log(response);
      return response;
    } catch(e) {
      this.compileErrorReport(e);
      console.log(e);
    }
  }

  getUserDataCallback(error, result) {
    if (result !== null) {
      console.log('Result', result);
    } else if (error !== null) {
      console.log("Something went wrong with your GetUserData call.");
      console.log("Here's some debug information:");
      console.log(this.compileErrorReport(error));
    }
  }

  compileErrorReport(error) {
    if (error == null)
      return "error is null";
    let fullErrors = error.errorMessage;
    for (let paramName in error.errorDetails)
      for (let msgIdx in error.errorDetails[paramName])
        fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
  }

  render() {
    return (
      <div>
        <div className="p-3 my-2 rounded">
          <Toast>
            <ToastHeader>
              Library
            </ToastHeader>
            <ToastBody>
              This is a toast on a white background — check it out!
            </ToastBody>
          </Toast>
        </div>
      </div>
    );
  }
}
