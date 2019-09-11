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
      isLoggedIn: false
    };

    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const self = this;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoggedIn: true
        });
      } else {
        this.setState({
          isLoggedIn: false
        });
      }
    })
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      console.log('successfully signed out.');
    }).catch(function(e) {
      // An error happened.
      console.log('signout failed: ', e);
    });
  }

  render() {
    let authButton;

    if (this.state && this.state.isLoggedIn) {
      authButton = (
        <div>
          <NavItem className="navbar-buttons-parent-right">
            <p onClick={this.signOut}>Sign out</p>
          </NavItem>
        </div>
      );
    } else {
      authButton = (
        <div>
          <NavItem className="navbar-buttons-parent-left">
            <Link to="/login/"><img className="navbar-buttons" alt="Log In" src={loginButton}/></Link>
          </NavItem>
          <NavItem className="navbar-buttons-parent-right">
            <Link to="/signup/"><img className="navbar-buttons" alt="Sign up" src={signupButton}/></Link>
          </NavItem>
        </div>
      );
    }

    return (
      <Router>
        <div>
          <Navbar light expand="md">
            <Link to="/"><img className="navbar-logo" alt="Neuroquery" src={logo}/></Link>
              <Nav className="ml-auto" navbar>
                <NavItem className="navbar-text-buttons">
                  <Link to="/library/" className="navbar-text">Library</Link>
                </NavItem>
                <NavItem className="navbar-text-buttons">
                  <Link to="/game/" className="navbar-text">Game</Link>
                </NavItem>
                {authButton}
              </Nav>
          </Navbar>

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
