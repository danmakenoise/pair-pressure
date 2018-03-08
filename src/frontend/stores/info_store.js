var GameDispatcher = require('../dispatchers/game_dispatcher')
var GameConstants = require('../constants/game_constants')

var Store = require('flux/utils').Store

var InfoStore = new Store(GameDispatcher)

InfoStore.votes = {}
InfoStore.players = 0

InfoStore._updateInfo = function (info) {
  this.players = info.players
  this.votes = info.votes
  this.__emitChange()
}

InfoStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case GameConstants.RECEIVE_INFO:
      InfoStore._updateInfo(payload.info)
      break
    default:
    // no-op
  }
}

module.exports = InfoStore
