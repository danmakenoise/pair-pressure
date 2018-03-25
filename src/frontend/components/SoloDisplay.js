import { Link } from 'react-router-dom'
import React from 'react'
import PlayerBoard from './PlayerBoard'
import Timer from './Timer'
var GameActions = require('../actions/game_actions')
var GameUtil = require('../utils/game_util')
var GameStore = require('../stores/game_store')

class SoloDisplay extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      voted: true,
      game: null,
      turnPhase: 'joining',
      timeRemaining: null
    }

    this._handleGameChange = this._handleGameChange.bind(this)
    this._handleGuess = this._handleGuess.bind(this)
    this._castVote = this._castVote.bind(this)
    this._updateVoteCycle = this._updateVoteCycle.bind(this)
    this._gameOver = this._gameOver.bind(this)
    this._startVoting = this._startVoting.bind(this)
  }

  componentDidMount () {
    this.listener = GameStore.addListener(this._handleGameChange)
    GameUtil.startNewGame()
  }

  componentWillUnmount () {
    window.clearTimeout(this.votingTimeout)
    window.clearTimeout(this.guessTimeout)
    this.listener.remove()
  }

  render () {
    if (this.state.game) {
      return (
        <main className='main display'>
          <PlayerBoard
            board={this.state.game.cards}
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
  }

  _handleGameChange () {
    if (this.state.turnPhase === 'joining') {
      this._startVoting()
    } else if (this.state.turnPhase === 'revealing') {
      var message = GameStore.game.isMatch() ? "It's a match!" : 'Not a match!'
      this.setState({game: GameStore.game, message: message, timeRemaining: '__'})
      this.guessTimeout = window.setTimeout(this._handleGuess, 2000)
    } else {
      this.setState({game: GameStore.game})
    }
  }

  _handleGuess () {
    if (GameStore.isOver()) {
      this.setState({game: null, message: 'You Won!'})
    } else {
      GameStore.game.handleGuess()
      this._startVoting()
    }
  }

  _castVote (idx) {
    if (!this.state.voted && this.state.voted !== 0) {
      this.setState({voted: idx})
    }
  }

  _updateVoteCycle () {
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
  }

  _gameOver () {
    this.setState({game: null, message: 'Game Over!'})
    this.listener.remove()
  }

  _startVoting () {
    this.setState({
      voted: false,
      game: GameStore.game,
      turnPhase: 'voting',
      timeRemaining: 10,
      message: 'Guess the matching card!'
    })
    this.votingTimeout = window.setTimeout(this._updateVoteCycle, 1000)
  }
}

export default SoloDisplay
