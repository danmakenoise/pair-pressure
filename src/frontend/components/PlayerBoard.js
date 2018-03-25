import PropTypes from 'prop-types'
import React from 'react'

import { COLORS, SYMBOLS } from '../../game/cards/config'
import Card from './Card'

const propTypes = {
  board: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.oneOf(COLORS),
    flipped: PropTypes.bool,
    symbol: PropTypes.oneOf(SYMBOLS)
  })),
  compChoice: PropTypes.number,
  onClick: PropTypes.func,
  players: PropTypes.number,
  voted: PropTypes.bool
}

const PlayerBoard = props => (
  <section className='section board group'>
    {props.board.map((card, index) => (
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
