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

export default class Navigation extends React.Component {
  render() {
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
                <NavItem className="navbar-buttons-parent-left">
                  <Link to="/login/"><img className="navbar-buttons" alt="Log In" src={loginButton}/></Link>
                </NavItem>
                <NavItem className="navbar-buttons-parent-right">
                  <Link to="/signup/"><img className="navbar-buttons" alt="Sign up" src={signupButton}/></Link>
                </NavItem>
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
