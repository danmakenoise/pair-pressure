var Game = require('../game/game');
var GameActions = require('../actions/game_actions');

var GameUtil = {
  startNewGame: function () {
    var newGame = new Game();
    newGame.startRound();
    GameActions.receiveGame(newGame);
  }
};

module.exports = GameUtil;
