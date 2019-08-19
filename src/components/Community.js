import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import * as firebase from "firebase/app";
import "firebase/auth"

export default class Community extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: []
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    const dbRef = db.collection("posts");
    let ideas = [];

    // Create the ideas array and push the firestore doc id into each element
    dbRef.get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          ideas.push({ ...doc.data(), id: doc.id });
        });
        this.setState({ ideas : ideas });
      })
      .catch((e) => {
        console.log('Error getting documents', e);
      });
  }

  render() {
    const libraryCards = [];

    this.state.ideas.forEach((idea) => {
      console.log(idea);
      libraryCards.push(
        <div className="my-2 rounded" key={idea.id} id="libraryParentDiv">
          <Toast id="libraryParentToast">
            <ToastHeader id="libraryHeaderToast">
              {idea.submissionTags[0]}
              {idea.submissionTags[1]}
            </ToastHeader>
            <ToastBody id="libraryBodyToast">
              {idea.content}
            </ToastBody>
          </Toast>
        </div>
      );
    });

    return (
      <div id="libraryContainer">
        <h4 id="myPrivateIdeas">Community</h4>
        {libraryCards}
      </div>
    );
  }
}
