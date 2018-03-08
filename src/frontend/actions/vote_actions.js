var GameDispatcher = require('../dispatchers/game_dispatcher')
var VoteConstants = require('../constants/vote_constants')

var VoteActions = {
  confirmVote: function (idx) {
    GameDispatcher.dispatch({
      actionType: VoteConstants.CONFIRM_VOTE,
      card: idx
    })
  }

}

module.exports = VoteActions
