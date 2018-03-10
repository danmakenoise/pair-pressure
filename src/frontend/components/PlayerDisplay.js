import React from 'react'
import PlayerBoard from './PlayerBoard'
var GameActions = require('../actions/game_actions')
var GameUtil = require('../utils/game_util')
var GameStore = require('../stores/game_store')
var SessionStore = require('../stores/session_store')
var SessionUtil = require('../utils/session_util')
var VoteStore = require('../stores/vote_store')
var VoteUtil = require('../utils/vote_util')
var Link = require('react-router').Link

class PlayerDisplay extends React.Component {
  constructor (props) {
    super(props)

    GameActions.receiveToken(props.params.id)

    this.state = {
      session: null,
      game: null,
      voted: -1
    }

    this._handleGameChange = this._handleGameChange.bind(this)
    this._fetchSession = this._fetchSession.bind(this)
    this._handleSessionChange = this._handleSessionChange.bind(this)
    this._handleVoteChange = this._handleVoteChange.bind(this)
    this._castVote = this._castVote.bind(this)
  }

  componentDidMount () {
    this.gameListener = GameStore.addListener(this._handleGameChange)
    this.voteListener = VoteStore.addListener(this._handleVoteChange)
    this.sessionListener = SessionStore.addListener(this._handleSessionChange)

    SessionUtil.fetchSession()
    GameUtil.loadGame(this.props.params.id)
  }

  componentWillUnmount () {
    this.gameListener.remove()
    this.voteListener.remove()
    this.sessionListener.remove()
    window.clearTimeout(this.sessionTimeout)
  }

  componentWillReceiveProps (newProps) {
    GameUtil.loadGame(newProps.params.id)
  }

  render () {
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
  }

  _handleGameChange () {
    console.log('handleGameChange')
    if (GameStore.game.isOver()) {
      this.setState({game: null})
      window.clearInterval(this.sessionTimeout)
    } else {
      this.setState({game: GameStore.game})
    }
  }

  _fetchSession () {
    SessionUtil.fetchSession()
  }

  _handleSessionChange () {
    this.sessionTimeout = window.setTimeout(this._fetchSession, 1000)

    this.setState({ session: SessionStore.session })

    if (SessionStore.session.vote === null) {
      this.setState({voted: -1})
      VoteStore.voted = null
      GameUtil.loadGame(this.props.params.id)
    } else {
      this.setState({ voted: parseInt(SessionStore.session.vote) })
    }
  }

  _handleVoteChange () {
    this.setState({ voted: VoteStore.voted })
  }

  _castVote (idx) {
    if (this.state.voted < 0) {
      VoteUtil.castVote(idx, SessionStore.session.token)
    }
  }
}

export default PlayerDisplay
