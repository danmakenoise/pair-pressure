import shuffle from 'lodash.shuffle'
import { COLORS as colors, SYMBOLS as symbols } from '../../game/cards/config'

import isMatch from '../../game/isMatch'
import getUnrevealedCards from '../../game/cards/getUnrevealedCards'
import chooseCard from '../../game/chooseCard'
import generateCombinations from '../../game/cards/generateCombinations'

var Game = function (cardsString, currentCard) {
  var cards

  if (cardsString) {
    cards = JSON.parse(cardsString)
    this.cards = cards
    this.computerCardPos = parseInt(currentCard)
  } else {
    this.cards = shuffle(generateCombinations({ colors, symbols }))
  }
}

Game.prototype.chooseCard = function (index) {
  this.cards = chooseCard({ index, cards: this.cards })
  this.playerCardPos = index
}

Game.prototype.handleGuess = function () {
  if (!this.isMatch()) {
    this.cards[this.computerCardPos].isRevealed = false
    this.cards[this.playerCardPos].isRevealed = false
  }
  this.startRound()
}

Game.prototype.isMatch = function () {
  const card = this.cards[this.playerCardPos]
  const otherCard = this.cards[this.computerCardPos]
  return isMatch({ card, otherCard })
}

Game.prototype.startRound = function () {
  this.computerCardPos = null
  this.playerCardPos = null

  this._flipRandomCard()
}

Game.prototype._flipRandomCard = function () {
  const [ index ] = shuffle(getUnrevealedCards(this.cards))
  this.cards = chooseCard({ index, cards: this.cards })
  this.computerCardPos = index
}

module.exports = Game
