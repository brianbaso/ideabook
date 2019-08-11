import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import title from '../img/neuroquery-login-title.png';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Col sm="12" md={{ size: 8, offset: 4 }} id="login-container">
        <Col xs="12" sm="5" id="login-container-left-child">
          <div>
            <img className="login-title" alt="Neuroquery" src={title}/>
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
                <Input type="password" name="password" id="examplePassword" placeholder="Enter your password" />
              </Col>
            </FormGroup>
          </Form>
        </Col>
        <Col xs="0" sm="7" id="login-container-right-child"/>
      </Col>
    );
  }
}
