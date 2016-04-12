$(function () {

window.PairPressure = window.PairPressure || {};

var Board = window.PairPressure.Board = function (cards) {
  this.cards = cards;
};

Board.prototype.cardAt = function (idx) {
  return this.cards[idx];
};

});
