import React from 'react';
import {
  Toast,
  ToastBody,
  Badge,
  Button,
  FormGroup,
  Form,
  Input
 } from 'reactstrap';
import * as firebase from "firebase/app";
import Created from './Created.js'
const shortid = require('shortid');

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      postId: '',
      content: '',
      submissionTags: [],
      problem: '',
      solution: '',
      comments: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveComment = this.saveComment.bind(this);
  }

  componentDidMount() {
    // Grab post ID from URL
    const url = window.location.pathname.split('/');
    const postId = url[2];

    const db = firebase.firestore();
    const dbRef = db.collection("posts").doc(postId);

    dbRef.get()
      .then((doc) => {
        let data = doc.data();
        console.log(data);

        this.setState({
          postId: postId,
          content: data.content,
          submissionTags: data.submissionTags,
          problem: data.problem,
          solution: data.solution,
          comments: data.comments
        });
      })
      .catch((e) => {
        console.log('Error getting documents... does this even work?', e);
      });
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
    const displayName = firebase.auth().currentUser.displayName;
    const db = firebase.firestore();
    const dbRef = db.collection("posts").doc(this.state.postId);
    const id = shortid.generate();
    const time = firebase.firestore.Timestamp.fromDate(new Date());

    dbRef.set({
      comments: {
        [id]: {
          text: this.state.value,
          author: displayName,
          roles: {
            [user]: "owner"
          },
          createdAt: time
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
    const comments = [];

    this.state.submissionTags.forEach((tag) => {
      tags.push(
        <Badge id="submissionTag" color="primary">{tag}</Badge>
      );
    })

    // If one comment exists
    if (this.state.comments) {
      Object.keys(this.state.comments).map((comment) => {
        const data = this.state.comments[comment];

        comments.push(
          <div id="post-comment">
            <div id="comment-header">
              <p id="comment-author">{data.author} •</p>
              <Created date={data.createdAt.toDate()} />
            </div>
            <div id="comment-body">
              <p id="comment-text">
                {data.text}
              </p>
            </div>
          </div>
        );
      })
    }

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
          </Toast>
          <FormGroup>
            <Form onSubmit={this.handleSubmit}>
              <Input id="comment-text-box" type="textarea" placeholder="Leave your comment here..."
              value={this.state.value} onChange={this.handleChange} />
              <Button id="post-comment-button" color="primary" type="submit">COMMENT</Button>
            </Form>
          </FormGroup>
          <Toast id="libraryParentToast">
            <ToastBody id="libraryBodyToast">
              {comments}
            </ToastBody>
          </Toast>
        </div>
      </div>
    );
  }
}
