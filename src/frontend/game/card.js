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

  return Card._shuffle(allCards)
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

Card._shuffle = function (array) {
  var numShifts = 1000
  var indexOne
  var indexTwo
  var temp

  for (var i = 0; i < numShifts; i++) {
    indexOne = Math.floor(Math.random() * array.length)
    indexTwo = Math.floor(Math.random() * array.length)

    temp = array[indexOne]
    array[indexOne] = array[indexTwo]
    array[indexTwo] = temp
  }

  return array
}

module.exports = Card
