var GameDispatcher = require('../dispatchers/game_dispatcher');
var GameConstants = require('../constants/game_constants');

var GameActions = {
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
};

module.exports = GameActions;
