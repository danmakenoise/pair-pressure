import React from 'react'
import MainBoard from './MainBoard'
import Timer from './Timer'
var GameUtil = require('../utils/game_util')
var GameStore = require('../stores/game_store')
var InfoStore = require('../stores/info_store')
var VoteUtil = require('../utils/vote_util')
var Link = require('react-router').Link

class MainDisplay extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      votes: {},
      players: 0,
      game: null,
      turnPhase: 'joining',
      timeRemaining: null
    }

    this._fetchGameInfo = this._fetchGameInfo.bind(this)
    this._handleInfoChange = this._handleInfoChange.bind(this)
    this._handleGameChange = this._handleGameChange.bind(this)
    this._handleGuess = this._handleGuess.bind(this)
    this._updateVoteCycle = this._updateVoteCycle.bind(this)
    this._gameOver = this._gameOver.bind(this)
    this._startVoting = this._startVoting.bind(this)
  }

  componentDidMount () {
    this.gameListener = GameStore.addListener(this._handleGameChange)
    this.infoListener = InfoStore.addListener(this._handleInfoChange)
    this.infoTimeout = window.setTimeout(this._fetchGameInfo, 1000)
    GameUtil.startNewGame()
  }

  componentWillUnmount () {
    this.gameListener.remove()
    this.infoListener.remove()
    window.clearTimeout(this.votingTimeout)
    window.clearTimeout(this.infoTimeout)
  }

  render () {
    if (this.state.game) {
      return (
        <main className='main display'>
          <MainBoard
            board={this.state.game.board}
            players={this.state.players}
            votes={this.state.votes}
            compChoice={this.state.game.computerCardPos}
          />
          <h2 className='subheader'>
            Players: {this.state.players} - Room Code: {GameStore.token}
          </h2>
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
  }

  _fetchGameInfo () {
    if (this.state.game) {
      GameUtil.fetchGameInfo()
      this.infoTimeout = window.setTimeout(this._fetchGameInfo, 1000)
    }
  }

  _handleInfoChange () {
    this.setState({players: InfoStore.players, votes: InfoStore.votes})
  }

  _handleGameChange () {
    if (this.state.turnPhase === 'joining') {
      this._startVoting()
    } else if (this.state.turnPhase === 'revealing') {
      var message = GameStore.game.wasMatch() ? "It's a match!" : 'Not a match!'
      this.setState({game: GameStore.game, message: message, timeRemaining: '__'})
      window.setTimeout(this._handleGuess, 2000)
    } else {
      this.setState({game: GameStore.game})
    }
  }

  _handleGuess () {
    if (GameStore.game.isOver()) {
      GameUtil.saveGame()
      this.setState({game: null, message: 'You Won!'})
    } else {
      GameStore.game.handleGuess()
      GameUtil.saveGame()
      this._startVoting()
    }
  }

  _updateVoteCycle () {
    if (this.state.timeRemaining > 0) {
      this.setState({timeRemaining: this.state.timeRemaining - 1})
      this.votingTimeout = window.setTimeout(this._updateVoteCycle, 1000)
    } else {
      this.setState({turnPhase: 'revealing', timeRemaining: null})
      VoteUtil.processVotes(this._gameOver)
    }
  }

  _gameOver () {
    this.setState({game: null, message: 'Game Over!'})
    this.gameListener.remove()
    this.voteListener.remove()
    this.sessionListener.remove()
    window.clearTimeout(this.sessionTimeout)
    window.clearTimeout(this.infoTimeout)
  }

  _startVoting () {
    if (this.state.turnPhase === 'joining') {
      this.setState({
        game: GameStore.game,
        turnPhase: 'voting',
        timeRemaining: 20,
        message: 'Join the game on your phone to vote!'
      })
    } else {
      this.setState({
        game: GameStore.game,
        turnPhase: 'voting',
        timeRemaining: 10,
        message: 'Vote for the matching card!'
      })
    }
    window.setTimeout(this._updateVoteCycle, 1000)
  }
}

module.exports = MainDisplay
