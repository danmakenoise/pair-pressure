var GameStore = require('../stores/game_store');
var GameActions = require('../actions/game_actions');
var VoteActions = require('../actions/vote_actions');
var VoteStore = require('../stores/vote_store');

var VoteUtil = {
  castVote: function (idx) {
    $.ajax({
      type: 'POST',
      url: 'api/vote',
      dataType: 'json',
      data: { vote: {
        token: GameStore.token,
        card: idx
      }},
      success: function () {
        VoteActions.confirmVote(idx);
      },
    });
  },

  processVotes: function () {
    $.ajax({
      type: 'GET',
      url: 'api/votes/' + GameStore.token,
      dataType: 'json',
      success: function (idx) {
        if (idx < 0) {
          // end game early
        } else {
          GameActions.flipCard(idx);
        }
      },
    });
  },
};

module.exports = VoteUtil;
