var React = require('react');
var PlayerBoard = require('./components/board/player_board');
var GameActions = require('../../actions/game_actions');
var GameUtil = require('../../utils/game_util');
var GameStore = require('../../stores/game_store');
var SessionStore = require('../../stores/session_store');
var SessionUtil = require('../../utils/session_util');
var VoteStore = require('../../stores/vote_store');
var VoteUtil = require('../../utils/vote_util');

var PlayerDisplay = React.createClass({
  getInitialState: function () {
    GameActions.receiveToken(this.props.params.id);
    return {session: null, game: null, voted: true};
  },

  componentDidMount: function () {
    this.gameListener = GameStore.addListener(this._handleGameChange);
    this.voteListener = VoteStore.addListener(this._handleVoteChange);
    this.sessionListener = SessionStore.addListener(this._handleSessionChange);

    SessionUtil.fetchSession();
    GameUtil.loadGame(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.gameListener.remove();
    this.voteListener.remove();
    this.sessionListener.remove();
    window.clearTimeout(this.sessionTimeout);
  },

  componentWillReceiveProps: function (newProps) {
    GameUtil.loadGame(newProps.params.id);
  },

  render: function () {
    if (this.state.game && this.state.session) {
      return (
        <main className="main display">
          <PlayerBoard
            board={this.state.game.board}
            onClick={this._castVote}
            voted={this.state.voted}
            compChoice={this.state.game.computerCardPos}
          />
        </main>
      );
    } else {
      return (
        <main className='main notice'>
          <h1 className='headline'>
            Game Not Found
          </h1>
        </main>
      );
    }
  },

  _handleGameChange: function () {
    if (GameStore.game.isOver()) {
      this.setState({game: null});
      window.clearInterval(this.sessionTimeout);
    } else {
      this.setState({game: GameStore.game});
    }
  },

  _fetchSession: function () {
    SessionUtil.fetchSession();
  },

  _handleSessionChange: function () {
    this.sessionTimeout = window.setTimeout(this._fetchSession, 1000);

    this.setState({session: SessionStore.session });

    if (!SessionStore.session.votes && SessionStore.session.votes !== 0) {
      this.setState({voted: false});
      VoteStore.voted = null;
      GameUtil.loadGame(this.props.params.id);
    } else {
      this.setState({voted: SessionStore.session.votes.card});
    }
  },

  _handleVoteChange: function () {
    this.setState({voted: VoteStore.voted });
  },

  _castVote: function (idx) {
    console.log(this.state.voted);
    if (!this.state.voted && this.state.voted !== 0) {
      this.setState({voted: true});
      VoteUtil.castVote(idx);
    }
  }
});

module.exports = PlayerDisplay;
