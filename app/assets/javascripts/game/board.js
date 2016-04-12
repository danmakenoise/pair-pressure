$(function () {

window.PairPressure = window.PairPressure || {};

var Board = window.PairPressure.Board = function () {
  this.grid = this._generateGrid();
  this._populateGrid();
};

Board.prototype._generateGrid = function () {
  var boardSize = 6,
      outputGrid = new Array(boardSize),
      outputRow;

  for (var i = 0; i < boardSize; i++) {
    outputRow = new Array(boardSize);
    outputGrid[i] = outputRow;
  }

  return outputGrid;
};

Board.prototype._populateGrid = function () {

};

});
