import React from 'react';
import {
  Toast,
  ToastBody,
  ToastHeader,
  Badge,
  Button,
  Collapse,
  CardBody,
  Card,
  FormGroup,
  Form,
  Label,
  Input
 } from 'reactstrap';
 import * as firebase from "firebase/app";
let admin = require('firebase-admin');

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      id: '',
      content: '',
      submissionTags: [],
      problem: '',
      solution: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveComment = this.saveComment.bind(this);
  }

  componentDidMount() {
    let routeState;

    // In order for this.props.location.state to persist after page refresh
    // for example, refreshing after a comment is submit
    // save this.props.location.state to localStorage so that it persists
    if (this.props.location.state) {
      console.log('routeState', this.props.location.state);
      localStorage.setItem('routeState', JSON.stringify(this.props.location.state));
      routeState = this.props.location.state;

      this.setState({
        id: routeState.id,
        content: routeState.content,
        submissionTags: routeState.submissionTags,
        problem: routeState.problem,
        solution: routeState.solution,
      });

    } else {
      routeState = localStorage.getItem('routeState');
      if (routeState) {
        routeState = JSON.parse(routeState);
      }

      this.setState({
        id: routeState.id,
        content: routeState.content,
        submissionTags: routeState.submissionTags,
        problem: routeState.problem,
        solution: routeState.solution,
      });
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    console.log('Comment successfully submitted', this.state.value);
    this.saveComment();
    event.preventDefault();
  }

  saveComment() {
    const user = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const dbRef = db.collection("posts").doc(this.state.id);

    dbRef.set({
      comment: {
        text: this.state.value,
        roles: {
          [user]: "owner"
        }
      }
    }, { merge: true })
    .then(() => {
      console.log("Document successfully written.");
    })
    .catch((e) => {
      console.log("Error writing document: ", e);
    });
  }

  render() {
    const tags = [];

    this.state.submissionTags.forEach((tag) => {
      tags.push(
        <Badge id="submissionTag" color="primary">{tag}</Badge>
      );
    })

    return (
      <div id="libraryContainer">
        <div className="my-2 rounded" id="libraryParentDiv">
          <h2>{this.state.content}</h2>
          <div id="post-subtitle-text">
            <p>August 31, 2019</p>
          </div>
          <Toast id="libraryParentToast">
            <ToastBody id="libraryBodyToast">
              <div>
                <p id="prob-sol-title">Problem</p>
                <p id="prob-sol-text">{this.state.problem}</p>
              </div>
              <hr id="horizontal-break"/>
              <div>
                <p id="prob-sol-title">Solution</p>
                <p id="prob-sol-text">{this.state.solution}</p>
              </div>
              <div id="post-submission-tags">
                {tags}
              </div>
            </ToastBody>
            <FormGroup>
              <Form onSubmit={this.handleSubmit}>
                <Input type="text" placeholder="Leave your comment here..."
                value={this.state.value} onChange={this.handleChange} />
                <Button color="primary" type="submit">Post Comment</Button>
              </Form>
            </FormGroup>
          </Toast>
        </div>
      </div>
    );
  }
}
