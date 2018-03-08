var GameStore = require('../stores/game_store');
var SessionActions = require('../actions/session_actions');
var SessionStore = require('../stores/session_store');

var SessionUtil = {
  fetchSession: function () {
    $.ajax({
      type: 'GET',
      url: 'api/session',
      dataType: 'json',
      data: { gameToken: GameStore.token, sessionToken: SessionStore.session && SessionStore.session.sessionToken },
      success: function (sessionData) {
        SessionActions.receiveSession(sessionData);
      }
    });
  }
};

module.exports = SessionUtil;
