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
      <div>
        <div className="p-3 my-2 rounded">
          <Toast>
            <ToastHeader>
              Reactstrap
            </ToastHeader>
            <ToastBody>
              This is a toast on a white background — check it out!
            </ToastBody>
          </Toast>
        </div>
      </div>
    );
  }
}
