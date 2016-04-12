var GameDispatcher = require('../dispatchers/game_dispatcher');
var GameConstants = require('../constants/game_constants');

var Store = require('flux/utils').Store;

var GameStore = new Store(GameDispatcher);

GameStore.game = null;

GameStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  case GameConstants.CARD_FLIPPED:
    this.__emitChange();
    break;
  case GameConstants.RECEIVE_GAME:
    GameStore.game = payload.game;
    this.__emitChange();
    break;
  case GameConstants.RECEIVE_TOKEN:
    GameStore.token = payload.token;
    console.log(payload.token);
    this.__emitChange();
    break;
  case GameConstants.START_GAME:
    GameStore.game = payload.game;
    break;
  default:
    // no-op
  }
};

module.exports = GameStore;
