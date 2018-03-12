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
  onClick: PropTypes.func,
  players: PropTypes.number,
  voted: PropTypes.bool
}

const PlayerBoard = props => (
  <section className='section board group'>
    {props.board.cards.map((card, index) => (
      <Card
        key={index}
        card={card}
        onClick={props.onClick.bind(null, index)}
        voted={props.voted === index}
        chosen={props.compChoice === index}
      />
    ))}
  </section>
)

PlayerBoard.propTypes = propTypes
export default PlayerBoard
