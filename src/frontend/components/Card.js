import PropTypes from 'prop-types'
import React from 'react'

import { COLORS, SYMBOLS } from '../../game/cards/config'

const propTypes = {
  card: PropTypes.shape({
    color: PropTypes.oneOf(COLORS),
    isRevealed: PropTypes.bool,
    symbol: PropTypes.oneOf(SYMBOLS)
  }),
  voted: PropTypes.bool,
  votes: PropTypes.number
}

const Card = props => (
  props.card.isRevealed
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
