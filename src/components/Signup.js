import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button
} from 'reactstrap';
import { Link } from "react-router-dom";
import title from '../img/neuroquery-login-title.svg';
import loginImage from '../img/login-image.svg'
import twitter from '../img/twitter-login.svg'
import google from '../img/google-login.svg'
import facebook from '../img/facebook-login.svg'
import * as firebase from "firebase/app";
import "firebase/auth";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    this.createAccountEmailAndPassword();
    event.preventDefault();
  }

  createAccountEmailAndPassword() {
    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let user = firebase.auth().currentUser;
        if (user != null) {
          const username = user.displayName;
          const userEmail = user.email;
          const isVerified = user.emailVerified;
          const id = user.uid;
        }
      })
      .catch((e) => {
        console.log(e.code, ' : ', e.message);
      });
  }

  render() {
    return (
      <Col sm="11" md={{ size: 8, offset: 4 }} id="login-container">
        <Col xs="12" sm="5" id="login-container-left-child">
          <div>
            <img id="login-title" alt="Neuroquery" src={title}/>
          </div>
          <Form id="login-form" onSubmit={this.handleSubmit}>
            <FormGroup col>
              <Label for="exampleEmail" sm={2} id="login-form-children">Username</Label>
              <Col sm={5} id="login-form-children">
                <Input type="username" name="username" id="exampleUsername" placeholder="Enter your username"
                value={this.state.username} onChange={this.handleUsernameChange}/>
              </Col>
            </FormGroup>
            <FormGroup col>
              <Label for="exampleEmail" sm={2} id="login-form-children">Email</Label>
              <Col sm={5} id="login-form-children">
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email address"
                 value={this.state.email} onChange={this.handleEmailChange}/>
              </Col>
            </FormGroup>
            <FormGroup col>
              <Label for="examplePassword" sm={2} id="login-form-children">Password</Label>
              <Col sm={5} id="login-form-children">
                <Input id="login-input" type="password" name="password" id="examplePassword"
                 placeholder="Enter your password"
                 value={this.state.password} onChange={this.handlePasswordChange}/>
              </Col>
            </FormGroup>
            <p id="or-use-text">or use</p>
            <div id="social-media-logins-parent">
              <img id="social-media-logins-child" alt="Twitter" src={twitter}/>
              <img id="social-media-logins-child" alt="Google" src={google}/>
              <img id="social-media-logins-child" alt="Facebook" src={facebook}/>
            </div>
            <div id="login-signin-button-parent">
              <Button id="new-signup-button" type="submit">
                   Sign up your account
              </Button>
              <Button id="existing-account-button">
                   Already have an account?
              </Button>
            </div>
          </Form>
        </Col>
        <Col xs="0" sm="7" id="login-container-right-child">
          <img id="login-image" alt="rapid-fire ideation" src={loginImage}/>
        </Col>
      </Col>
    );
  }
}
