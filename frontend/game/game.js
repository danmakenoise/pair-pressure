var Board = require('./board');
var Card = require('./card');

var Game = function (cardsString, currentCard) {
  var cards;
  
  if (cardsString) {
    cards = Card.combinationsFromString(cardsString);
    this.board = new Board(cards);
    this.computerCardPos = parseInt(currentCard);
    this.computerCard = this.board.cardAt(this.computerCardPos);
  } else {
    cards = Card.allCombinations();
    this.board = new Board(cards);
  }

};

Game.prototype.chooseCard = function (idx) {
  var chosenCard = this.board.cardAt(idx);

  if (chosenCard.flipped) {
    throw 'InvalidCard';
  } else {
    this.playerCardPos = idx;
    this.playerCard = chosenCard;
    chosenCard.flip();
  }
};

Game.prototype.handleGuess = function () {
  if (!this.playerCard.isMatch(this.computerCard)) {
    this.computerCard.flip();
    this.playerCard.flip();
  }
    this.startRound();
};

Game.prototype.startRound = function () {
  this.computerCardPos = null;
  this.computerCard = null;
  this.playerCard = null;
  this.playerCardPos = null;

  this._flipRandomCard();
};

Game.prototype._flipRandomCard = function () {
  var flipped = false,
      chosenCard,
      idx;

  while (!flipped) {
    idx = Math.floor(Math.random() * this.board.size);
    chosenCard = this.board.cardAt(idx);

    if (!chosenCard.flipped) {
      chosenCard.flip();
      flipped = true;
      this.computerCard = chosenCard;
      this.computerCardPos = idx;
    }
  }
};

module.exports = Game;
