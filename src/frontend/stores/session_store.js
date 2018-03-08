var GameDispatcher = require('../dispatchers/game_dispatcher')
var SessionConstants = require('../constants/session_constants')

var Store = require('flux/utils').Store

var SessionStore = new Store(GameDispatcher)

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.RECEIVE_SESSION:
      SessionStore.session = payload.session
      this.__emitChange()
      break
    default:
    // no-op
  }
}

module.exports = SessionStore
