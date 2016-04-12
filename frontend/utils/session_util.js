var GameStore = require('../stores/game_store');
var SessionActions = require('../actions/session_actions');
var SessionStore = require('../stores/session_store');

var SessionUtil = {
  startSession: function () {
    $.ajax({
      type: 'GET',
      url: 'api/session',
      dataType: 'json',
      data: { token: GameStore.token },
      success: function (sessionData) {
        console.log(sessionData);
      }
    });
  }
};

module.exports = SessionUtil;
