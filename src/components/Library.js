import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import * as firebase from "firebase/app";

export default class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: []
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser.uid;
    const db = firebase.firestore();
    const dbRef = db.collection("users").doc(user)
      .collection("private-ideas");
    let ideas = [];

    dbRef.get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          ideas.push(doc.data());
        });
        this.setState({ ideas : ideas });
      })
      .catch((e) => {
        console.log('Error getting documents', e);
      });
  }

  render() {
    const userIdeas = [];

    for (let key in this.state.userData) {
      if (this.state.userData.hasOwnProperty(key)) {
        userIdeas.push(
          <div className="my-2 rounded" id="libraryParentDiv">
            <Toast id="libraryParentToast">
              <ToastHeader id="libraryHeaderToast">
                {key}
              </ToastHeader>
              <ToastBody id="libraryBodyToast">
                {this.state.userData[key].Value}
              </ToastBody>
            </Toast>
          </div>
        );
      }
      console.log('User ideas:', userIdeas);
    }

    return (
      <div id="libraryContainer">
        <h4 id="myPrivateIdeas">My Private Ideas</h4>
        {userIdeas}
      </div>
    );
  }
}
