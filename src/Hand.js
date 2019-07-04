import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

const Hand = (props) => {
  return (
    <div>
      <Col className="Hand" sm="12" md={{ size: 12, offset: 3 }}>
        <Col sm="2">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
          </Card>
        </Col>
        <Col sm="2">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
          </Card>
        </Col>
        <Col sm="2">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
          </Card>
        </Col>
      </Col>
      <Col className="Hand" sm="12" md={{ size: 12, offset: 3 }}>
        <Col sm="2">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
          </Card>
        </Col>
        <Col sm="2">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
          </Card>
        </Col>
        <Col sm="2">
          <Card body>
            <CardTitle>Special Title Treatment</CardTitle>
          </Card>
        </Col>
      </Col>
    </div>
  );
};

export default Hand;
