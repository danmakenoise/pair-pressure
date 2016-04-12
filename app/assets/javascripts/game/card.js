$(function () {

window.PairPressure = window.PairPressure || {};

var Card = window.PairPressure.Card = function (symbol, color) {
  this.symbol = symbol;
  this.color = color;
};

Card.allCombinations = function () {
  var allCards = [],
      allSymbols = Card._allSymbols,
      allColors = Card._allColors,
      newCard;

  allSymbols.forEach( function (symbol) {
    allColors.forEach( function (color) {
      for (var i = 0; i < 2; i++ ) {
        newCard = new Card(symbol, color);
        allCards.push(newCard);
      }
    });
  });

  return allCards;
};

Card._allSymbols = [
  1,
  2,
  3,
  4,
  5,
  6,
];

Card._allColors = [
  'red',
  'blue',
  'yellow',
];

});
