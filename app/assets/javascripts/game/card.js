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

  return Card._shuffle(allCards);
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

Card._shuffle = function (array) {
  var numShifts = 1000,
      indexOne,
      indexTwo,
      temp;

  for (var i = 0; i < numShifts; i++) {
    indexOne = Math.floor(Math.random() * array.length);
    indexTwo = Math.floor(Math.random() * array.length);

    temp = array[indexOne];
    array[indexOne] = array[indexTwo];
    array[indexTwo] = temp;
  }

  return array;
};

});
