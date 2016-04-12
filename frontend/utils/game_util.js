var Game = require('../game/game');
var GameActions = require('../actions/game_actions');
var GameStore = require('../stores/game_store');

var GameUtil = {
  loadGame: function (id) {
    $.ajax({
      type: 'GET',
      url: 'api/games/' + id,
      dataType: 'json',
      success: function (data) {
        var loadedGame = new Game(data.cards, data.currentCard, data.token);
        GameActions.receiveGame(loadedGame);
      }
    });
  },

  saveGame: function () {
    $.ajax({
      type: 'POST',
      url: 'api/save',
      dataType: 'text',
      data: { game: {
        cards: this._stringifyCards(GameStore.game.board.cards),
        current_card: GameStore.game.computerCardPos,
        token: GameStore.token
      }},
      success: function () {
        console.log('game saved');
      },
    });
  },

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
        cards: this._stringifyCards(newGame.board.cards),
        current_card: newGame.computerCardPos
      }},
      success: function (token) {
        window.setInterval(this.loadGame.bind(null, token), 1000);
        GameActions.receiveToken(token);
      }.bind(this),
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
