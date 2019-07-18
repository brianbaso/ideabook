import React from 'react';
import './App.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
 } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './Library.js';
import Community from './Community.js';
import Hand from './Hand.js';
import nqlogo from './img/neuroquery-logo.svg';
import loginButton from './img/login-button.png';
import signupButton from './img/signup-button.png';

function App() {
  return (
    <Router>
      <div className="Parent-Container">
        <Navbar light expand="md">
          <NavbarBrand href="/"><img className="navbar-logo" alt="Neuroquery" src={nqlogo}/></NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem className="navbar-text-buttons">
                <Link to="/library/" className="navbar-text">Library</Link>
              </NavItem>
              <NavItem className="navbar-text-buttons">
                <Link to="/game/" className="navbar-text">Game</Link>
              </NavItem>
              <NavItem>
                <NavLink className="navbar-buttons-parent-left" href="https://github.com/reactstrap/reactstrap">
                  <img className="navbar-buttons" alt="Log In" src={loginButton}/>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navbar-buttons-parent-right" href="https://github.com/reactstrap/reactstrap">
                  <img className="navbar-buttons" alt="Sign up" src={signupButton}/>
                </NavLink>
              </NavItem>
            </Nav>
        </Navbar>

        <Route exact path="/" component={Community}/>
        <Route path="/game/" component={Hand}/>
        <Route path="/library/" component={Library}/>
      </div>
    </Router>
  );
}

export default App;
