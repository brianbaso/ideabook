import React from 'react';
import axios from 'axios'
import { Row, Col, Container } from 'reactstrap';

export default class Hand extends React.Component {
  state = {
    cards: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(response => {
        let cards = response.data.slice(0,8);
        this.setState({ cards });
      })
  }

  render () {
    let handCards = this.state.cards.map(card => {
      return <text>{card.name}</text>;
    });
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col className="Hand-Card Card-1">{handCards[0]}</Col>
          <Col className="Hand-Card Card-2">{handCards[1]}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col className="Hand-Card Card-3">{handCards[2]}</Col>
          <Col></Col>
          <Col></Col>
          <Col className="Hand-Card Card-4">{handCards[3]}</Col>
        </Row>
        <Row>
          <Col className="Hand-Card Card-5">{handCards[4]}</Col>
          <Col></Col>
          <Col></Col>
          <Col className="Hand-Card Card-6">{handCards[5]}</Col>
        </Row>
        <Row>
          <Col></Col>
          <Col className="Hand-Card Card-7">{handCards[6]}</Col>
          <Col className="Hand-Card Card-8">Annoying Guy</Col>
          <Col></Col>
        </Row>
      </Container>
    );
  };
}
