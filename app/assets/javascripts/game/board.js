$(function () {

window.PairPressure = window.PairPressure || {};

var Board = window.PairPressure.Board = function (cards) {
  this.grid = this._generateGrid(cards);
};

Board.prototype._generateGrid = function (cards) {
  var boardSize = 6,
      outputGrid = new Array(boardSize);

  for (var i = 0; i < boardSize; i++) {
    outputRow = cards.splice(0, boardSize);
    outputGrid[i] = outputRow;
  }

  return outputGrid;
};

});
