import React from 'react'
import Card from './Card'

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

export default MainBoard
