import React from 'react';
import PostPreview from './PostPreview.js'
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
        <PostPreview
          key={idea.id}
          id={idea.id}
          submissionTags={idea.submissionTags}
          content={idea.content}
          createdAt={idea.createdAt}
          author={idea.author}
         />
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
