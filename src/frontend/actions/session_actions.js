var SessionConstants = require('../constants/session_constants')
var GameDispatcher = require('../dispatchers/game_dispatcher')

var SessionActions = {
  receiveSession: function (sessionData) {
    GameDispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_SESSION,
      session: sessionData
    })
  }
}

module.exports = SessionActions
