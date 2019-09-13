import React from 'react';
import {
  Toast,
  ToastBody,
  ToastHeader,
  Badge
 } from 'reactstrap';
 import * as firebase from "firebase/app";
 import { Link } from 'react-router-dom'
 import Created from './Created.js'

export default class PostPreview extends React.Component {
  render() {
    const submissionTags = [];

    this.props.submissionTags.forEach((tag) => {
      submissionTags.push(
        <Badge id="submissionTag" color="primary">{tag}</Badge>
      );
    })

    console.log(this.props.content, ' by ', this.props.author);
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
            <div id="share-date-parent">
              <p id="share-button">
                {this.props.author}
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
          </ToastBody>
        </Toast>
      </div>
    );
  }
}
