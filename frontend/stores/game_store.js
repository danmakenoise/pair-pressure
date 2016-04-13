var GameDispatcher = require('../dispatchers/game_dispatcher');
var GameConstants = require('../constants/game_constants');
var GameUtil = require('../utils/game_util');

var Store = require('flux/utils').Store;

var GameStore = new Store(GameDispatcher);

GameStore.game = null;
// GameStore.votes = null;
// GameStore.players = 0;
//
// GameStore._updateInfo = function (info) {
//   debugger;
//   window.setTimeout(GameUtil.fetchGameInfo, 2000);
// };

GameStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
  // case GameConstants.RECEIVE_INFO:
  //   GameStore._updateInfo(payload.info);
  //   break;
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
