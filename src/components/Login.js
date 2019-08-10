import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div id="libraryContainer">
        <div className="p-3 my-2 rounded" id="login-background">
          <Form>
            <FormGroup col>
              <Label for="exampleEmail" sm={2}>Email</Label>
              <Col sm={5}>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email address" />
              </Col>
            </FormGroup>
            <FormGroup col>
              <Label for="examplePassword" sm={2}>Password</Label>
              <Col sm={5}>
                <Input type="password" name="password" id="examplePassword" placeholder="Enter your password" />
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
