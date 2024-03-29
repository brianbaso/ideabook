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
 import Created from './Created.js'

export default class PrivateIdeaPreview extends React.Component {
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
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const dbRef = db.collection("posts");
    const time = firebase.firestore.Timestamp.fromDate(new Date());

    dbRef.add({
      content: this.props.content,
      submissionTags: this.props.submissionTags,
      problem: this.state.problem,
      solution: this.state.solution,
      roles: {
        [user.uid]: "owner"
      },
      createdAt: time,
      author: user.displayName
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
                {this.props.content}
            </div>
            <div>
              <div id="share-date-parent">
                <p id="share-button" onClick={this.toggle}>
                  Share
                </p>
                <div id="private-idea-created">
                  {this.props.createdAt &&
                    <div id="private-idea-created-child">
                      <p id="private-idea-share-created-seperator">•</p>
                      <Created date={this.props.createdAt.toDate()} />
                    </div>
                  }
                </div>
              </div>
              <Collapse isOpen={this.state.collapse}>
                <Card>
                  <CardBody>
                    <FormGroup>
                      <Form onSubmit={this.handleSubmit}>
                        <Label for="exampleText">
                          What's the problem you're solving?
                        </Label>
                        <Input type="textarea" name="text" id="problemText"
                         placeholder="Enter the problem"
                         value={this.state.problem} onChange={this.handleProblemChange}/>
                        <Label for="exampleText">
                          What's the solution?
                        </Label>
                        <Input type="textarea" name="text" id="solutionText"
                         placeholder="Enter the solution"
                         value={this.state.solution} onChange={this.handleSolutionChange}/>
                         <Button id="postButton" color="primary" type="submit"
                          outline>Post</Button>
                      </Form>
                    </FormGroup>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </ToastBody>
        </Toast>
      </div>
    );
  }
}
