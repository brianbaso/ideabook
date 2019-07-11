import React from 'react';
import axios from 'axios'
import { Row, Col, Container } from 'reactstrap';

export default class Hand extends React.Component {
  state = {
    hand: []
  }

  componentDidMount() {
    axios.get(`./deck.json`)
      .then(response => {
        const deck = response.data[0].cards;
        console.log(response.data[0].cards);
        const shuffle = deck.sort(() => 0.5 - Math.random());
        let hand = shuffle.slice(0, 8);
        this.setState({ hand: hand });
      })
  }

  render () {
    let cards = this.state.hand.map(card => {
      return <p>{card}</p>;
    });
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col className="Hand-Card Card-1">{cards[0]}</Col>
          <Col className="Hand-Card Card-2">{cards[1]}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col className="Hand-Card Card-3">{cards[2]}</Col>
          <Col></Col>
          <Col></Col>
          <Col className="Hand-Card Card-4">{cards[3]}</Col>
        </Row>
        <Row>
          <Col className="Hand-Card Card-5">{cards[4]}</Col>
          <Col></Col>
          <Col></Col>
          <Col className="Hand-Card Card-6">{cards[5]}</Col>
        </Row>
        <Row>
          <Col></Col>
          <Col className="Hand-Card Card-7">{cards[6]}</Col>
          <Col className="Hand-Card Card-8">{cards[7]}</Col>
          <Col></Col>
        </Row>
      </Container>
    );
  };
}
