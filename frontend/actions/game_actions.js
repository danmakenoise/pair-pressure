var GameDispatcher = require('../dispatchers/game_dispatcher');
var GameConstants = require('../constants/game_constants');

var GameActions = {
  receiveGame: function (game) {
    GameDispatcher.dispatch({
      actionType: GameConstants.RECEIVE_GAME,
      game: game
    });
  }
};

module.exports = GameActions;
