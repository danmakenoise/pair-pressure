import PropTypes from 'prop-types'
import React from 'react'

import { COLORS, SYMBOLS } from '../../game/cards/config'
import Card from './Card'

const propTypes = {
  board: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.oneOf(COLORS),
    isRevealed: PropTypes.bool,
    symbol: PropTypes.oneOf(SYMBOLS)
  })),
  compChoice: PropTypes.number,
  players: PropTypes.number,
  votes: PropTypes.number
}

const MainBoard = props => console.log(props.board) || (
  <section className='section board group'>
    {props.board.map((card, index) => (
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
