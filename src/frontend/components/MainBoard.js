import PropTypes from 'prop-types'
import React from 'react'

import CardModel from '../game/card'
import Card from './Card'

const propTypes = {
  board: PropTypes.shape({
    cards: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.oneOf(CardModel._allColors),
      chosen: PropTypes.bool,
      flipped: PropTypes.bool,
      symbol: PropTypes.oneOf(CardModel._allSymbols)
    }))
  }),
  compChoice: PropTypes.number,
  players: PropTypes.number,
  votes: PropTypes.number
}

const MainBoard = props => (
  <section className='section board group'>
    {props.board.cards.map((card, index) => (
      <Card
        key={index}
        card={card}
        votes={props.votes[index] / props.players}
        chosen={props.compChoice === index}
      />
    ))}
  </section>
)

MainBoard.propTypes = propTypes
export default MainBoard
