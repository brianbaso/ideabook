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
 import Post from './Post.js'
 import { Router, Route, Link } from 'react-router-dom'

export default class PostPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      problem: '',
      solution: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleProblemChange = this.handleProblemChange.bind(this);
    this.handleSolutionChange = this.handleSolutionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleProblemChange(event) {
    this.setState({
      problem: event.target.value
    });
  }

  handleSolutionChange(event) {
    this.setState({
      solution: event.target.value
    });
  }

  handleSubmit(event) {
    // debugger;
    // console.log('Post successfully submitted',
    //  this.state.problem, this.state.solution);
     this.createPost();
     event.preventDefault();
  }

  /*
    1. Create forms that show when 'Share' button is clicked
    2. Fill out 'problem' and 'solution' form
    3. Press 'Post'
    4. Set 'content' and 'submission tags' of idea selected
    as variables in createPost scope (or can we access props?)
    5. Create new post and reference new variables + fields from dom
  */
  createPost() {
    const user = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const dbRef = db.collection("posts");

    dbRef.add({
      content: this.props.content,
      submissionTags: this.props.submissionTags,
      problem: this.state.problem,
      solution: this.state.solution,
      roles: {
        [user]: "owner"
      }
    })
    .then(() => {
      console.log("Post successfully created");
    })
    .catch((e) => {
      console.log("Error creating post: ", e);
    });
  }

  render() {
    const submissionTags = [];

    this.props.submissionTags.forEach((tag) => {
      submissionTags.push(
        <Badge id="submissionTag" color="primary">{tag}</Badge>
      );
    })

    return (
      <div className="my-2 rounded" id="libraryParentDiv">
        <Toast id="libraryParentToast">
          <ToastHeader id="libraryHeaderToast">
            {submissionTags}
          </ToastHeader>
          <ToastBody id="libraryBodyToast">
            <div>
              <Link to={{ pathname: `/post/${this.props.id}` }}>
                {this.props.content}
              </Link>
            </div>
          </ToastBody>
        </Toast>
      </div>
    );
  }
}
