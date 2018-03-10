import React from 'react'
import PlayerBoard from '../PlayerBoard'
var GameActions = require('../../actions/game_actions')
var GameUtil = require('../../utils/game_util')
var GameStore = require('../../stores/game_store')
var SessionStore = require('../../stores/session_store')
var SessionUtil = require('../../utils/session_util')
var VoteStore = require('../../stores/vote_store')
var VoteUtil = require('../../utils/vote_util')
var Link = require('react-router').Link

var PlayerDisplay = React.createClass({
  getInitialState: function () {
    GameActions.receiveToken(this.props.params.id)
    return {session: null, game: null, voted: -1}
  },

  componentDidMount: function () {
    this.gameListener = GameStore.addListener(this._handleGameChange)
    this.voteListener = VoteStore.addListener(this._handleVoteChange)
    this.sessionListener = SessionStore.addListener(this._handleSessionChange)

    SessionUtil.fetchSession()
    GameUtil.loadGame(this.props.params.id)
  },

  componentWillUnmount: function () {
    this.gameListener.remove()
    this.voteListener.remove()
    this.sessionListener.remove()
    window.clearTimeout(this.sessionTimeout)
  },

  componentWillReceiveProps: function (newProps) {
    GameUtil.loadGame(newProps.params.id)
  },

  render: function () {
    if (this.state.game && this.state.session) {
      return (
        <main className='main display'>
          <PlayerBoard
            board={this.state.game.board}
            onClick={this._castVote}
            voted={this.state.voted}
            compChoice={this.state.game.computerCardPos}
          />
        </main>
      )
    } else {
      return (
        <main className='main notice'>
          <h1 className='headline'>
            This Game Has Ended
          </h1>
          <Link to='/' className='link link--centered'>Main Menu</Link>
        </main>
      )
    }
  },

  _handleGameChange: function () {
    console.log('handleGameChange')
    if (GameStore.game.isOver()) {
      this.setState({game: null})
      window.clearInterval(this.sessionTimeout)
    } else {
      this.setState({game: GameStore.game})
    }
  },

  _fetchSession: function () {
    SessionUtil.fetchSession()
  },

  _handleSessionChange: function () {
    this.sessionTimeout = window.setTimeout(this._fetchSession, 1000)

    this.setState({ session: SessionStore.session })

    if (SessionStore.session.vote === null) {
      this.setState({voted: -1})
      VoteStore.voted = null
      GameUtil.loadGame(this.props.params.id)
    } else {
      this.setState({ voted: parseInt(SessionStore.session.vote) })
    }
  },

  _handleVoteChange: function () {
    this.setState({ voted: VoteStore.voted })
  },

  _castVote: function (idx) {
    if (this.state.voted < 0) {
      VoteUtil.castVote(idx, SessionStore.session.token)
    }
  }
})

module.exports = PlayerDisplay
