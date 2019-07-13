import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

export default class IdeaInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <Form>
        <FormGroup>
            <Input type="textarea" name="text" id="exampleText" placeholder="What's the big idea?" />
        </FormGroup>
        <Button>Save</Button>
      </Form>
    );
  };
}
