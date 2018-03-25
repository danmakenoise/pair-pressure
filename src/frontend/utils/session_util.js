var GameStore = require('../stores/game_store')
var SessionActions = require('../actions/session_actions')
var SessionStore = require('../stores/session_store')

var SessionUtil = {
  fetchSession: function () {
    const session = SessionStore.session ? SessionStore.session.sessionToken : null

    const baseUrl = '/api/session?'
    const gameToken = `gameToken=${GameStore.token}`
    const sessionToken = session ? `&sessionToken=${session}` : ''

    window.fetch(baseUrl + gameToken + sessionToken)
      .then(res => res.json())
      .then(sessionData => {
        SessionActions.receiveSession(sessionData)
      })
  }
}

module.exports = SessionUtil
