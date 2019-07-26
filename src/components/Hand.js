import React from 'react';
import axios from 'axios'
import { Row, Col, Container } from 'reactstrap';
import IdeaInput from './IdeaInput.js'

export default class Hand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: [],
      cardsSelected: 0,
      cardOneColor: "",
      cardTwoColor: "",
      cardThreeColor: "",
      cardFourColor: "",
      cardFiveColor: "",
      cardSixColor: "",
      cardSevenColor: "",
      cardEightColor: ""
    };
  }

  componentDidMount() {
    axios.get(`../deck.json`)
      .then(response => {
        const deck = response.data[0].cards;
        let hand = this.shuffleDeck(deck);
        this.setState({ hand : hand });
      })
  }

  shuffleDeck(deck) {
    const shuffle = deck.sort(() => 0.5 - Math.random());
    let hand = shuffle.slice(0, 8);
    return hand;
  }

  teaseState(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  cardOneClick = (e) => {
    this.setState({
      cardOneColor: "linear-gradient(230deg, rgba(255,128,109,1) 0%, rgba(251,203,66,1) 100%)",
      cardsSelected: this.state.cardsSelected + 1
    })
  }

  cardTwoClick = (e) => {
    this.setState({
      cardTwoColor: "linear-gradient(230deg, rgba(255,128,109,1) 0%, rgba(251,203,66,1) 100%)",
      cardsSelected: this.state.cardsSelected + 1
    })
  }

  cardThreeClick = (e) => {
    this.setState({
      cardThreeColor: "linear-gradient(230deg, rgba(255,128,109,1) 0%, rgba(251,203,66,1) 100%)",
      cardsSelected: this.state.cardsSelected + 1
    })
  }

  cardFourClick = (e) => {
    this.setState({
      cardFourColor: "linear-gradient(230deg, rgba(255,128,109,1) 0%, rgba(251,203,66,1) 100%)",
      cardsSelected: this.state.cardsSelected + 1
    })
  }

  cardFiveClick = (e) => {
    this.setState({
      cardFiveColor: "linear-gradient(230deg, rgba(255,128,109,1) 0%, rgba(251,203,66,1) 100%)",
      cardsSelected: this.state.cardsSelected + 1
    })
  }

  cardSixClick = (e) => {
    this.setState({
      cardSixColor: "linear-gradient(230deg, rgba(255,128,109,1) 0%, rgba(251,203,66,1) 100%)",
      cardsSelected: this.state.cardsSelected + 1
    })
  }

  cardSevenClick = (e) => {
    this.setState({
      cardSevenColor: "linear-gradient(230deg, rgba(255,128,109,1) 0%, rgba(251,203,66,1) 100%)",
      cardsSelected: this.state.cardsSelected + 1
    })
  }

  cardEightClick = (e) => {
    this.setState({
      cardEightColor: "linear-gradient(230deg, rgba(255,128,109,1) 0%, rgba(251,203,66,1) 100%)",
      cardsSelected: this.state.cardsSelected + 1
    })
  }

  render () {
    let cards = this.state.hand.map(card => {
      return <p>{card}</p>;
    });

    return (
      <div id="handDiv">
        <Container>
          <Row>
            <Col></Col>
            <Col className="Hand-Card Card-1" style={{background: this.state.cardOneColor}} onClick={this.cardOneClick}>{cards[0]}</Col>
            <Col className="Hand-Card Card-2" style={{background: this.state.cardTwoColor}} onClick={this.cardTwoClick}>{cards[1]}</Col>
            <Col></Col>
          </Row>
          <Row>
            <Col className="Hand-Card Card-3" style={{background: this.state.cardThreeColor}} onClick={this.cardThreeClick}>{cards[2]}</Col>
            <Col></Col>
            <Col></Col>
            <Col className="Hand-Card Card-4" style={{background: this.state.cardFourColor}} onClick={this.cardFourClick}>{cards[3]}</Col>
          </Row>
          <Row>
            <Col className="Hand-Card Card-5" style={{background: this.state.cardFiveColor}} onClick={this.cardFiveClick}>{cards[4]}</Col>
            <Col></Col>
            <Col>{ this.state.cardsSelected === 2 ? <IdeaInput /> : null }</Col>
            <Col className="Hand-Card Card-6" style={{background: this.state.cardSixColor}} onClick={this.cardSixClick}>{cards[5]}</Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="Hand-Card Card-7" style={{background: this.state.cardSevenColor}} onClick={this.cardSevenClick}>{cards[6]}</Col>
            <Col className="Hand-Card Card-8" style={{background: this.state.cardEightColor}} onClick={this.cardEightClick}>{cards[7]}</Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  };
}
