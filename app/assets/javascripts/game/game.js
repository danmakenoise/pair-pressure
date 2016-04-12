$(function () {

window.PairPressure = window.PairPressure || {};

var Game = window.PairPressure.Game = function () {
  var cards = window.PairPressure.Card.allCombinations();
  this.board = new window.PairPressure.Board(cards);
};

Game.prototype.chooseCard = function (row, col, callback) {
  var chosenCard = this.board.cardAt(row, col);

  if (chosenCard.flipped) {
    throw 'InvalidCard';
  } else {
    this.playerCardPos = [row, col];
    this.playerCard = chosenCard;
    chosenCard.flip();
  }

  callback && callback();
};

Game.prototype.handleGuess = function (callback) {
  if (!this.playerCard.isMatch(this.computerCard)) {
    this.playerCard.flip();
  }
    this.startRound();
    callback && callback();
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
      row,
      col;

  while (!flipped) {
    row = Math.floor(Math.random() * this.board.size);
    col = Math.floor(Math.random() * this.board.size);
    chosenCard = this.board.cardAt(row, col);

    if (!chosenCard.flipped) {
      flipped = true;
      this.computerCard = chosenCard;
      this.computerCardPos = [row, col];
    }
  }
};

});
