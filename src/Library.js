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

    this.getUserData = this.getUserData.bind(this);
  }

  // componentDidMount() {
  //   let userData = this.getUserData();
  //   console.log("User data is:", this.state.userData);
  // }

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    const requestBody = {
      Data: {
        PlayFabId: Config.testPlayerTitleId,
      }
    };

    // try {
    PlayFabClient.GetUserData(requestBody, (error, result) => {
      if (result !== null) {
        this.setState({ userData: result.data });
        console.log('User data state', this.state.userData);
      } else if (error !== null) {
        console.log("Something went wrong with your GetUserData call.");
        console.log("Here's some debug information:");
        console.log(this.compileErrorReport(error));
      }
    });
      // console.log('Response:', response);
      // this.setState({ userData : response });
      // console.log('User data state', this.state.userData);
      // console.log('Response:', response);

    // } catch(e) {
    //   this.compileErrorReport(e);
    //   console.log(e);
    // }

    // try {
    //   PlayFabClient.GetUserData(requestBody, this.getUserDataCallback)
    //     .then((response) => this.setState({ userData : response }))
    //     .then((response) => console.log('User data state', this.state.userData));
    // } catch(e) {
    //   this.compileErrorReport(e);
    //   console.log(e);
    // }
  }

  // getUserDataCallback(error, result) {
  //   if (result !== null) {
  //     console.log('Result', result);
  //   } else if (error !== null) {
  //     console.log("Something went wrong with your GetUserData call.");
  //     console.log("Here's some debug information:");
  //     console.log(this.compileErrorReport(error));
  //   }
  // }

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
