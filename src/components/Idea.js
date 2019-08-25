import React from 'react';
import {
  Toast,
  ToastBody,
  ToastHeader,
  Badge,
  Button
 } from 'reactstrap';

export default class Idea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

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
              <p id="share-button">
                Share
              </p>
            </div>
          </ToastBody>
        </Toast>
      </div>
    );
  }
}
