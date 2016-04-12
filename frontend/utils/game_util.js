var Game = require('../game/game');
var GameActions = require('../actions/game_actions');

var GameUtil = {
  startNewGame: function () {
    var newGame = new Game();
    newGame.startRound();
    this._createGame(newGame);
    GameActions.receiveGame(newGame);
  },

  _createGame: function (newGame) {
    $.ajax({
      type: 'POST',
      url: 'api/save',
      dataType: 'text',
      data: { game: {
        cards: this._stringifyCards(newGame.board.cards)
      }},
      success: function (token) {
        GameActions.receiveToken(token);
      },
    });
  },

  _stringifyCards: function (cards) {
    var output = [];

    cards.forEach(function(card) {
      var currentCard = [];
      currentCard.push(card.symbol);
      currentCard.push(card.color);
      currentCard.push(card.flipped);
      output.push(currentCard.join(','));
    });

    return output.join('\n');
  },
};

module.exports = GameUtil;
