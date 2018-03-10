import React from 'react'
import Card from './Card'

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

export default PlayerBoard
