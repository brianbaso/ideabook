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

  */

  saveUserData() {
    let db = firebase.firestore();

    db.collection("ideas").doc("test").set({
      content: this.state.value,
      submissionTags: this.props.submissionTags,
      roles: {
        userId: "owner"
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
