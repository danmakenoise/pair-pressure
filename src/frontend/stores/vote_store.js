var GameDispatcher = require('../dispatchers/game_dispatcher')
var VoteConstants = require('../constants/vote_constants')

var Store = require('flux/utils').Store

var VoteStore = new Store(GameDispatcher)

VoteStore.voted = null

VoteStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case VoteConstants.CONFIRM_VOTE:
      VoteStore.voted = payload.card
      this.__emitChange()
      break
    default:
    // no-op
  }
}

module.exports = VoteStore
