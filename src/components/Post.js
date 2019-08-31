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

    };
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
          </Toast>
        </div>
      </div>
    );
  }
}
