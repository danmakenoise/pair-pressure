var Game = require('../game/game')
var GameStore = require('../stores/game_store')
var GameActions = require('../actions/game_actions')

var GameUtil = {
  loadGame: function (id) {
    window.fetch(`/api/games/${id}`)
      .then(res => res.json())
      .then(data => {
        var loadedGame = new Game(data.cards, data.currentCard, data.token)
        GameActions.receiveGame(loadedGame)
      })
  },

  fetchGameInfo: function () {
    window.fetch(`/api/games/${GameStore.token}`)
      .then(res => res.json())
      .then(data => {
        GameActions.receiveGameInfo(data)
      })
  },

  saveGame: function () {
    window.fetch('/api/save', {
      body: JSON.stringify({
        game: {
          cards: JSON.stringify(GameStore.game.cards),
          current_card: GameStore.game.computerCardPos,
          token: GameStore.token
        }
      }),
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      method: 'POST'
    })
  },

  startNewGame: function () {
    var newGame = new Game()
    newGame.startRound()
    this._createGame(newGame)
    GameActions.startGame(newGame)
  },

  startSoloGame: function () {
    var newGame = new Game()
    newGame.startRound()
    GameActions.startGame(newGame)
  },

  _createGame: function (newGame) {
    window.fetch('/api/save', {
      body: JSON.stringify({
        game: {
          cards: JSON.stringify(newGame.cards),
          current_card: newGame.computerCardPos
        }
      }),
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      method: 'POST'
    })
      .then(res => res.text())
      .then(token => GameActions.receiveToken(token))
  }
}

module.exports = GameUtil
