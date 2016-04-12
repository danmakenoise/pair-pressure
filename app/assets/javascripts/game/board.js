$(function () {

window.PairPressure = window.PairPressure || {};

var Board = window.PairPressure.Board = function (cards) {
  this.size = 6;
  this.grid = this._generateGrid(cards);
};

Board.prototype.cardAt = function (row, col) {
  return this.grid[row][col];
};

Board.prototype._generateGrid = function (cards) {
  var outputGrid = new Array(this.size);

  for (var i = 0; i < this.size; i++) {
    outputRow = cards.splice(0, this.size);

    outputGrid[i] = outputRow;
  }
  return outputGrid;
};

});
