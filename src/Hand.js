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
      return <p>{card.name}</p>;
    });
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col className="Hand-Card">{handCards[0]}</Col>
          <Col className="Hand-Card">{handCards[1]}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col className="Hand-Card">{handCards[2]}</Col>
          <Col></Col>
          <Col></Col>
          <Col className="Hand-Card">{handCards[3]}</Col>
        </Row>
        <Row>
          <Col className="Hand-Card">{handCards[4]}</Col>
          <Col></Col>
          <Col></Col>
          <Col className="Hand-Card">{handCards[5]}</Col>
        </Row>
        <Row>
          <Col></Col>
          <Col className="Hand-Card">{handCards[6]}</Col>
          <Col className="Hand-Card">{handCards[7]}</Col>
          <Col></Col>
        </Row>
      </Container>
    );
  };
}
