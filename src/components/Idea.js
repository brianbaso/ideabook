import React from 'react';
import {
  Toast,
  ToastBody,
  ToastHeader,
  Badge,
  Button,
  Collapse,
  CardBody,
  Card
 } from 'reactstrap';
 import * as firebase from "firebase/app";

export default class Idea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  /*
    1. Create forms that show when 'Share' button is clicked
    2. Fill out 'problem' and 'solution' form
    3. Press 'Post'
    4. Set 'content' and 'submission tags' as variables in createPost scope
    5. Create new post and reference new variables + fields from dom
  */
  // createPost() {
  // }

  render() {
    const submissionTags = [];

    this.props.submissionTags.forEach((tag) => {
      submissionTags.push(
        <Badge id="submissionTag" color="primary" outline>{tag}</Badge>
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
              <p id="share-button" onClick={this.toggle}>
                Share
              </p>
              <Collapse isOpen={this.state.collapse}>
                <Card>
                  <CardBody>
                    Sample text
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
