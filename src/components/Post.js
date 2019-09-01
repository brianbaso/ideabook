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

export default class Post extends React.Component {
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
    console.log('Comment successfully submitted', this.state.value);
    this.saveComment();
    event.preventDefault();
  }

  saveComment() {
    const user = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const dbRef = db.collection("posts").doc(user);

    dbRef.update({
      comments: db.FieldValue.arrayUnion({
        comment: this.state.value,
        roles: {
          [user]: "owner"
        }
      })
    })
    .then(() => {
      console.log("Document successfully written.");
    })
    .catch((e) => {
      console.log("Error writing document: ", e);
    });
  }

  componentDidMount() {
    let routeState;

    if (this.props.location.state) {
      console.log('routeState', this.props.location.state);
      localStorage.setItem('routeState', JSON.stringify(this.props.location.state));
      routeState = this.props.location.state;
    } else {
      routeState = localStorage.getItem('routeState');
      if (routeState) {
        routeState = JSON.parse(routeState);
      }
    }
  }

  render() {
    const content = this.props.location.state.content;
    const problem = this.props.location.state.problem;
    const solution = this.props.location.state.solution;
    const submissionTags = this.props.location.state.submissionTags;
    const tags = [];

    submissionTags.forEach((tag) => {
      tags.push(
        <Badge id="submissionTag" color="primary">{tag}</Badge>
      );
    })

    return (
      <div id="libraryContainer">
        <div className="my-2 rounded" id="libraryParentDiv">
          <h2>{content}</h2>
          <div id="post-subtitle-text">
            <p>August 31, 2019</p>
          </div>
          <Toast id="libraryParentToast">
            <ToastBody id="libraryBodyToast">
              <div>
                <p id="prob-sol-title">Problem</p>
                <p id="prob-sol-text">{problem}</p>
              </div>
              <hr id="horizontal-break"/>
              <div>
                <p id="prob-sol-title">Solution</p>
                <p id="prob-sol-text">{solution}</p>
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
