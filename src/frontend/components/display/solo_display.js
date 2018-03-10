import React from 'react'
import PlayerBoard from '../PlayerBoard'
var GameActions = require('../../actions/game_actions')
var GameUtil = require('../../utils/game_util')
var GameStore = require('../../stores/game_store')
var Timer = require('./components/timer')
var Link = require('react-router').Link

var SoloDisplay = React.createClass({
  getInitialState: function () {
    return {voted: true, game: null, turnPhase: 'joining', timeRemaining: null}
  },

  componentDidMount: function () {
    this.listener = GameStore.addListener(this._handleGameChange)
    GameUtil.startNewGame()
  },

  componentWillUnmount: function () {
    window.clearTimeout(this.votingTimeout)
    window.clearTimeout(this.guessTimeout)
    this.listener.remove()
  },

  render: function () {
    if (this.state.game) {
      return (
        <main className='main display'>
          <PlayerBoard
            board={this.state.game.board}
            voted={this.state.voted}
            onClick={this._castVote}
            compChoice={this.state.game.computerCardPos}
          />
          <h2 className='message-board'>
            {this.state.message}
          </h2>
          <Timer
            display={this.state.timeRemaining}
          />
        </main>
      )
    } else {
      return (
        <main className='main'>
          <h1 className='headline'>{this.state.message}</h1>
          <Link to='/' className='link link--centered'>Main Menu</Link>
        </main>
      )
    }
  },

  _handleGameChange: function () {
    if (this.state.turnPhase === 'joining') {
      this._startVoting()
    } else if (this.state.turnPhase === 'revealing') {
      var message = GameStore.game.wasMatch() ? "It's a match!" : 'Not a match!'
      this.setState({game: GameStore.game, message: message, timeRemaining: '__'})
      this.guessTimeout = window.setTimeout(this._handleGuess, 2000)
    } else {
      this.setState({game: GameStore.game})
    }
  },

  _handleGuess: function () {
    if (GameStore.game.isOver()) {
      this.setState({game: null, message: 'You Won!'})
    } else {
      GameStore.game.handleGuess()
      this._startVoting()
    }
  },

  _castVote: function (idx) {
    if (!this.state.voted && this.state.voted !== 0) {
      this.setState({voted: idx})
    }
  },

  _updateVoteCycle: function () {
    if (!this.state.voted && this.state.voted !== 0 && this.state.timeRemaining > 0) {
      this.setState({timeRemaining: this.state.timeRemaining - 1})
      this.votingTimeout = window.setTimeout(this._updateVoteCycle, 1000)
    } else {
      if (!this.state.voted && this.state.voted !== 0) {
        this._gameOver()
      } else {
        var cardToFlip = this.state.voted
        this.setState({voted: false, turnPhase: 'revealing', timeRemaining: null})
        GameActions.flipCard(cardToFlip)
      }
    }
  },

  _gameOver: function () {
    this.setState({game: null, message: 'Game Over!'})
    this.listener.remove()
  },

  _startVoting: function () {
    this.setState({
      voted: false,
      game: GameStore.game,
      turnPhase: 'voting',
      timeRemaining: 10,
      message: 'Guess the matching card!'
    })
    this.votingTimeout = window.setTimeout(this._updateVoteCycle, 1000)
  }
})

module.exports = SoloDisplay
