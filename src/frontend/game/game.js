import shuffle from 'lodash.shuffle'
import { COLORS as colors, SYMBOLS as symbols } from '../../game/cards/config'

import chooseCard from '../../game/chooseCard'
import generateCombinations from '../../game/cards/generateCombinations'

var Game = function (cardsString, currentCard) {
  var cards

  if (cardsString) {
    cards = JSON.parse(cardsString)
    this.cards = cards
    this.computerCardPos = parseInt(currentCard)
    this.computerCard = this.cards[this.computerCardPos]
  } else {
    this.cards = shuffle(generateCombinations({ colors, symbols }))
  }
}

Game.prototype.chooseCard = function (index) {
  this.cards = chooseCard({ index, cards: this.cards })
  this.playerCardPos = index
  this.playerCard = this.cards[index]
}

Game.prototype.handleGuess = function () {
  if (!this.isMatch()) {
    this.computerCard.isRevealed = false
    this.playerCard.isRevealed = false
  }
  this.startRound()
}

Game.prototype.isMatch = function () {
  const symbolsMatch = this.playerCard.symbol === this.computerCard.symbol
  const colorsMatch = this.playerCard.color === this.computerCard.color

  return symbolsMatch && colorsMatch
}

Game.prototype.startRound = function () {
  this.computerCardPos = null
  this.computerCard = null
  this.playerCard = null
  this.playerCardPos = null

  this._flipRandomCard()
}

Game.prototype._flipRandomCard = function () {
  var flipped = false
  var chosenCard
  var idx

  while (!flipped) {
    idx = Math.floor(Math.random() * this.cards.length)
    chosenCard = this.cards[idx]

    if (!chosenCard.isRevealed) {
      chosenCard.isRevealed = true
      flipped = true
      this.computerCard = chosenCard
      this.computerCardPos = idx
    }
  }
}

module.exports = Game
