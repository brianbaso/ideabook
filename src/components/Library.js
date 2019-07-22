import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import Config from '../config/config.json'
import ErrorHandlers from '../index.js'
import PlayFabClient from '../../node_modules/playfab-sdk/Scripts/PlayFab/PlayFabClient';

export default class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {}
    };
  }

  componentDidMount() {
    const requestBody = {
      Data: {
        PlayFabId: Config.testPlayerTitleId,
      }
    };

    PlayFabClient.GetUserData(requestBody, (error, result) => {
      if (result !== null) {
        this.setState({ userData: result.data.Data });
        console.log('User data state', this.state.userData);
      } else if (error !== null) {
        console.log("Something went wrong with your GetUserData call.");
        console.log("Here's some debug information:");
        console.log(ErrorHandlers.compileErrorReport(error));
      }
    });
  }

  render() {
    for (let key in this.state.userData) {
      if (this.state.userData.hasOwnProperty(key)) {
        console.log(key + ' -> ' + this.state.userData[key].Value);
      }
    }

    return (
      <div>
        <ul>
          <p>this</p>
        </ul>
      </div>
    );
  }
}
