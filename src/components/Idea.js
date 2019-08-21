import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

export default class Idea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="my-2 rounded" id="libraryParentDiv">
        <Toast id="libraryParentToast">
          <ToastHeader id="libraryHeaderToast">
            {this.props.submissionTags[0]}
            {this.props.submissionTags[1]}
          </ToastHeader>
          <ToastBody id="libraryBodyToast">
            {this.props.content}
          </ToastBody>
        </Toast>
      </div>
    );
  }
}
