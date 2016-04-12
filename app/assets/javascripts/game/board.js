$( function ( root ) {

root.PairPressure = root.PairPressure || {};

var Board = root.PairPressure.Board = function ( boardSize, symbols ) {
  if ( boardSize % 2 === 1 ) {
    boardSize += 1;
  }

  this.grid = this._generateGrid( boardSize, symbols );
};

Board.prototype._generateGrid = function ( boardSize, symbols ) {
  for ( var i = 0; i < boardSize; i++ ) {
    for ( var j = 0; j < boardSize; j++ ) {
      outputGrid[i][j] = null;
    }
  }
};
})( window );
