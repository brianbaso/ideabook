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

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  
  render() {
    return (
      <Col sm="11" md={{ size: 8, offset: 4 }} id="login-container">
        <Col xs="12" sm="5" id="login-container-left-child">
          <div>
            <img id="login-title" alt="Neuroquery" src={title}/>
          </div>
          <Form id="login-form">
            <FormGroup col>
              <Label for="exampleEmail" sm={2} id="login-form-children">Email</Label>
              <Col sm={5} id="login-form-children">
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email address" />
              </Col>
            </FormGroup>
            <FormGroup col>
              <Label for="examplePassword" sm={2} id="login-form-children">Password</Label>
              <Col sm={5} id="login-form-children">
                <Input id="login-input" type="password" name="password" id="examplePassword" placeholder="Enter your password" />
              </Col>
            </FormGroup>
          </Form>
          <p id="or-use-text">or use</p>
          <div id="social-media-logins-parent">
            <img id="social-media-logins-child" alt="Twitter" src={twitter}/>
            <img id="social-media-logins-child" alt="Google" src={google}/>
            <img id="social-media-logins-child" alt="Facebook" src={facebook}/>
          </div>
          <div id="login-signin-button-parent">
            <Button id="login-signin-button">
                 Sign in your account
            </Button>
            <Button id="login-signup-button">
                 Create an account
            </Button>
            <Link to="/login/"><p id="forgot-password">Forgot your password?</p></Link>
          </div>
        </Col>
        <Col xs="0" sm="7" id="login-container-right-child">
          <img id="login-image" alt="rapid-fire ideation" src={loginImage}/>
        </Col>
      </Col>
    );
  }
}
