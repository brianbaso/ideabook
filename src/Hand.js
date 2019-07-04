import React from 'react';
import axios from 'axios'
import { Card, CardTitle, Col } from 'reactstrap';

export default class Hand extends React.Component {
  state = {
    cards: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(response => {
        console.log(response);
        const cards = response.data.slice(0,6);
        this.setState({ cards });
      })
  }

  render () {
    return (
      <div>
        <Col className="Hand" sm="12" md={{ size: 12, offset: 0 }}>
          {this.state.cards.map(card =>
            <Col className="Card" sm="2">
              <Card body>
                <CardTitle>{card.name}</CardTitle>
              </Card>
            </Col>
          )}
        </Col>
      </div>
    );
  };
}
