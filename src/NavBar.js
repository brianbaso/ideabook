import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
 } from 'reactstrap';
import nqlogo from './img/neuroquery-logo.svg';
import loginButton from './img/login-button.svg';
import signupButton from './img/signup-button.svg';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand href="/"><img className="navbar-logo" src={nqlogo}/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="navbar-text-buttons">
                <NavLink className="navbar-text" href="/components/">Community</NavLink>
              </NavItem>
              <NavItem className="navbar-text-buttons">
                <NavLink className="navbar-text" href="https://github.com/reactstrap/reactstrap">Game</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navbar-buttons-parent-left" href="https://github.com/reactstrap/reactstrap">
                  <img className="navbar-buttons" src={loginButton}/>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navbar-buttons-parent-right" href="https://github.com/reactstrap/reactstrap">
                  <img className="navbar-buttons" src={signupButton}/>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
