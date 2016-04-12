$(function () {

window.PairPressure = window.PairPressure || {};

var Game = window.PairPressure.Game = function () {
  var cards = window.PairPressure.Card.allCombinations();
  this.board = new window.PairPressure.Board(cards);
};

});
