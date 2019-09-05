import React from 'react';
import PrivateIdeaPreview from './PrivateIdeaPreview.js'
import * as firebase from "firebase/app";
import "firebase/auth"

export default class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ideas: []
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const db = firebase.firestore();
        const dbRef = db.collection("users").doc(uid)
          .collection("private-ideas");
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
    })
  }

  render() {
    const libraryCards = [];

    this.state.ideas.forEach((idea) => {
      console.log(idea);
      libraryCards.push(
        <PrivateIdeaPreview
          key={idea.id}
          submissionTags={idea.submissionTags}
          content={idea.content}
          createdAt={idea.createdAt}
         />
      );
    });

    return (
      <div id="libraryContainer">
        <h4 id="myPrivateIdeas">My Private Ideas</h4>
        {libraryCards}
      </div>
    );
  }
}
