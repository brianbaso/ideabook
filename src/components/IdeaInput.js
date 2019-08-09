import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import * as firebase from "firebase/app";

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
    const user = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const dbRef = db.collection("users").doc(user).collection("private-ideas");

    dbRef.add({
      content: this.state.value,
      submissionTags: this.props.submissionTags,
      roles: {
        [user]: "owner"
      }
    })
    .then(() => {
      console.log("Document successfully written.");
    })
    .catch((e) => {
      console.log("Error writing document: ", e);
    });
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
