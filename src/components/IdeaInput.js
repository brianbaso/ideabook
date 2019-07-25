import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import PlayFabClient from '../../node_modules/playfab-sdk/Scripts/PlayFab/PlayFabClient';
import uuidv1 from 'uuid/v1';

export default class IdeaInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    console.log('Form successfully submitted', this.state.value);
    this.saveUserData();
    event.preventDefault();
  }

  saveUserData() {
    const uniqueId = uuidv1();
    const requestBody = {
      Data: {
        uniqueId: this.state.value
      },
      Permission: "Private"
    };

    try {
      PlayFabClient.UpdateUserData(requestBody, this.saveUserDataCallback);
    } catch(e) {
      this.compileErrorReport(e);
      console.log(e);
    }
  }

  saveUserDataCallback(error, result) {
    if (result !== null) {
      console.log('Result', result);
    } else if (error !== null) {
      console.log("Something went wrong with your SaveUserData call.");
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
      <FormGroup>
        <Form onSubmit={this.handleSubmit}>
          <Input type="text" placeholder="What's the big idea?"
          value={this.state.value} onChange={this.handleChange}/>
          <Button color="primary" type="submit">Save</Button>
        </Form>
      </FormGroup>
    );
  }
}
