import React from 'react';
import {
  Navbar,
  Nav,
  NavItem
 } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './Library.js';
import Community from './Community.js';
import Hand from './Hand.js';
import Signup from './Signup.js'
import Login from './Login.js'
import Post from './Post.js'
import logo from '../img/neuroquery-logo.svg';
import loginButton from '../img/login-button.png';
import signupButton from '../img/signup-button.png';
import * as firebase from "firebase/app";
import "firebase/auth"

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      isAuthenticating: true
    };

    this.signOut = this.signOut.bind(this);
    this.authUser = this.authUser.bind(this);
  }

  componentDidMount() {
    this.authUser().then((user) => {
       this.setState({
          isLoggedIn: true,
          isAuthenticating: false
        });
    }, (error) => {
       this.setState({
         isLoggedIn: false,
         isAuthenticating: false
       });
       console.log(error);
    });
  }

  authUser() {
   return new Promise(function (resolve, reject) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        resolve(user);
      } else {
        reject('User not logged in');
      }
    });
   });
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      console.log('successfully signed out.');
      // Take user to home page after successful logout
      window.location='/login';
    }).catch(function(e) {
      // An error happened.
      console.log('signout failed: ', e);
    });
  }

  render() {
    let authButton;

    // Do not load any nav buttons until auth has completed
    if (this.state.isAuthenticating) {
      return null;
    } else {
      if (this.state.isLoggedIn) {
        authButton = (
          <Navbar light expand="md">
            <Link to="/"><img className="navbar-logo" alt="Neuroquery" src={logo}/></Link>
              <Nav className="ml-auto" navbar>
                <NavItem className="navbar-text-buttons">
                  <Link to="/library/" className="navbar-text">Library</Link>
                </NavItem>
                <NavItem className="navbar-text-buttons">
                  <Link to="/game/" className="navbar-text">Game</Link>
                </NavItem>
                <NavItem className="navbar-buttons-parent-right">
                  <p onClick={this.signOut}>Sign out</p>
                </NavItem>
              </Nav>
          </Navbar>
        );
      } else {
        authButton = (
          <Navbar light expand="md">
            <Link to="/"><img className="navbar-logo" alt="Neuroquery" src={logo}/></Link>
              <Nav className="ml-auto" navbar>
                <NavItem className="navbar-buttons-parent-left">
                  <Link to="/login/"><img className="navbar-buttons" alt="Log In" src={loginButton}/></Link>
                </NavItem>
                <NavItem className="navbar-buttons-parent-right">
                  <Link to="/signup/"><img className="navbar-buttons" alt="Sign up" src={signupButton}/></Link>
                </NavItem>
              </Nav>
          </Navbar>
        );
      }
    }

    return (
      <Router>
        <div>

                {authButton}

          <Route exact path="/" component={Community}/>
          <Route path="/game/" component={Hand}/>
          <Route path="/library/" component={Library}/>
          <Route path="/signup/" component={Signup}/>
          <Route path="/login/" component={Login}/>
          <Route path="/post/:id" component={Post}/>
        </div>
      </Router>
    );
  }
}
