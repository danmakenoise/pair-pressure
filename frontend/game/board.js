var Board = function (cards) {
  this.cards = cards;
  this.size = cards.length;
};

Board.prototype.cardAt = function (idx) {
  return this.cards[idx];
};

module.exports = Board;
