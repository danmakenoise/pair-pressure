var GameDispatcher = require('../dispatchers/game_dispatcher');
var GameConstants = require('../constants/game_constants');
var GameStore = require('../stores/game_store');

var GameActions = {
  flipCard: function (idx) {
    var game = GameStore.game;
    game.chooseCard(idx);
    GameDispatcher.dispatch({
      actionType: GameConstants.CARD_FLIPPED,
    });
  },

  receiveGame: function (game) {
    GameDispatcher.dispatch({
      actionType: GameConstants.RECEIVE_GAME,
      game: game
    });
  },

  receiveToken: function (token) {
    GameDispatcher.dispatch({
      actionType: GameConstants.RECEIVE_TOKEN,
      token: token
    });
  },

  startGame: function (game) {
    GameDispatcher.dispatch({
      actionType: GameConstants.START_GAME,
      game: game
    });
  },

};

module.exports = GameActions;
