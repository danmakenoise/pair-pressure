var Game = require('../game/game')
var GameStore = require('../stores/game_store')
var GameActions = require('../actions/game_actions')

var GameUtil = {
  loadGame: function (id) {
    window.fetch(`api/games/${id}`)
      .then(res => res.json())
      .then(data => {
        var loadedGame = new Game(data.cards, data.currentCard, data.token)
        GameActions.receiveGame(loadedGame)
      })
  },

  fetchGameInfo: function () {
    window.fetch(`api/games/${GameStore.token}`)
      .then(res => res.json())
      .then(data => {
        GameActions.receiveGameInfo(data)
      })
  },

  saveGame: function () {
    window.fetch('api/save', {
      body: JSON.stringify({
        game: {
          cards: this._stringifyCards(GameStore.game.board.cards),
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
    window.fetch('api/save', {
      body: JSON.stringify({
        game: {
          cards: this._stringifyCards(newGame.board.cards),
          current_card: newGame.computerCardPos
        }
      }),
      credentials: 'same-origin',
      headers: { 'content-type': 'application/json' },
      method: 'POST'
    })
      .then(res => res.text())
      .then(token => console.log(token) || GameActions.receiveToken(token))
  },

  _stringifyCards: function (cards) {
    var output = []

    cards.forEach(function (card) {
      var currentCard = []
      currentCard.push(card.symbol)
      currentCard.push(card.color)
      currentCard.push(card.flipped)
      output.push(currentCard.join(','))
    })

    return output.join('\n')
  }
}

module.exports = GameUtil
