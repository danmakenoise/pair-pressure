var Card = function (symbol, color, flipped) {
  this.symbol = symbol;
  this.color = color;
  this.flipped = flipped;
};

Card.allCombinations = function () {
  var allCards = [],
      allSymbols = Card._allSymbols,
      allColors = Card._allColors,
      newCard;

  allSymbols.forEach( function (symbol) {
    var colorIdx = Math.floor(Math.random() * allColors.length);
    var color = allColors[colorIdx];

    for (var i = 0; i < 2; i++ ) {
      newCard = new Card(symbol, color, false);
      allCards.push(newCard);
    }
  });

  return Card._shuffle(allCards);
};

Card.combinationsFromString = function (string) {
  var cards = string.split('\n'),
      output = [],
      newCard,
      symbol,
      color,
      flipped;

  cards.forEach(function(card){
    card = card.split(',');
    symbol = card[0];
    color = card[1];
    flipped = card[2] === 'false' ? false : true;

    newCard = new Card(symbol, color, flipped);
    output.push(newCard);
  });

  return output;
};

Card.prototype.isMatch = function (otherCard) {
  if (otherCard.symbol === this.symbol && otherCard.color === this.color) {
    return true;
  } else {
    return false;
  }
};

Card.prototype.flip = function () {
  this.flipped = !this.flipped;
};

Card._allSymbols = [
  'A',
  'B',
  'C',
  '$',
  '#',
  '@'
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

module.exports = Card;
