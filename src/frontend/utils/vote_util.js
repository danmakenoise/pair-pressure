var GameStore = require('../stores/game_store')
var GameActions = require('../actions/game_actions')
var SessionStore = require('../stores/session_store')
var VoteActions = require('../actions/vote_actions')

var VoteUtil = {
  castVote: function (idx) {
    window.fetch('/api/vote', {
      body: JSON.stringify({
        vote: {
          token: GameStore.token,
          card: idx,
          sessionToken: SessionStore.session.sessionToken
        }
      }),
      headers: { 'content-type': 'application/json' },
      method: 'POST'
    })
      .then(() => VoteActions.confirmVote(idx))
  },

  processVotes: function (gameOverCallback) {
    window.fetch('/api/votes/' + GameStore.token)
      .then(res => res.json())
      .then(data => {
        const idx = data.winner

        if (idx < 0) {
          gameOverCallback()
        } else {
          GameActions.flipCard(idx)
        }
      })
  }
}

module.exports = VoteUtil
