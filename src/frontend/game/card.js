import shuffle from 'lodash.shuffle'

import { COLORS as colors, SYMBOLS as symbols } from '../../game/cards/config'
import generateCombinations from '../../game/cards/generateCombinations'

var Card = function (symbol, color, flipped) {
  this.symbol = symbol
  this.color = color
  this.flipped = flipped
}

Card.allCombinations = function () {
  const allCards = generateCombinations({ colors, symbols })
    .map(card => new Card(card.symbol, card.color, card.isRevealed))

  return shuffle(allCards)
}

Card.prototype.isMatch = function (otherCard) {
  if (otherCard.symbol === this.symbol && otherCard.color === this.color) {
    return true
  } else {
    return false
  }
}

Card.prototype.flip = function () {
  this.flipped = !this.flipped
}

module.exports = Card
