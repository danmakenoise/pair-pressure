import PropTypes from 'prop-types'
import React from 'react'

import CardModel from '../game/card'

const propTypes = {
  card: PropTypes.shape({
    color: PropTypes.oneOf(CardModel._allColors),
    chosen: PropTypes.bool,
    flipped: PropTypes.bool,
    symbol: PropTypes.oneOf(CardModel._allSymbols)
  }),
  voted: PropTypes.bool,
  votes: PropTypes.number
}

const Card = props => (
  props.card.flipped
    ? (
      <section className={_determineRevealedCardClassName(props)}>
        <p className='text card__text'>{props.card.symbol}</p>
      </section>
    ) : (
      <section
        className={_determineHiddenCardClassName(props)}
        onClick={props.onClick}
      >
        <p className='text card__text'>&nbsp;</p>
      </section>
    )
)

const _determineRevealedCardClassName = props => {
  var chosen = props.chosen ? ' card--chosen' : ''
  return 'section card card--' + props.card.color + chosen
}

const _determineHiddenCardClassName = props => {
  var selected = props.voted ? ' card--voted' : ''

  var votedFor = ''

  if (props.votes > 0.75) {
    votedFor = ' card--most'
  } else if (props.votes > 0.50) {
    votedFor = ' card--many'
  } else if (props.votes > 0) {
    votedFor = ' card--some'
  }

  return 'section card card--down' + selected + votedFor
}

Card.propTypes = propTypes
export default Card
