var React = require('react');
var MainBoard = require('./components/board/main_board');
var GameActions = require('../../actions/game_actions');
var GameUtil = require('../../utils/game_util');
var GameStore = require('../../stores/game_store');
var InfoStore = require('../../stores/info_store');
var VoteUtil = require('../../utils/vote_util');
var Timer = require('./components/timer');

var MainDisplay = React.createClass({
  getInitialState: function () {
    return {votes: {}, players: 0, game: null, turnPhase: 'joining', timeRemaining: null};
  },

  componentDidMount: function () {
    this.listener = GameStore.addListener(this._handleGameChange);
    this.infoListener = InfoStore.addListener(this._handleInfoChange);
    window.setTimeout(GameUtil.fetchGameInfo, 2000);
    GameUtil.startNewGame();
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.infoListener.remove();
    window.clearTimeout(this.votingTimeout);
  },

  render: function () {
    if (this.state.game) {
      return (
        <main className="main display">
          <MainBoard
            board={this.state.game.board}
            players={this.state.players}
            votes={this.state.votes}/>
          <h2 className="subheader">
            Players: {this.state.players} - Room Code: {GameStore.token}
          </h2>
          <Timer
            display={this.state.timeRemaining}
          />
        </main>
      );
    } else {
      return (
        <main className='main'>
          <h1 className='headline'>{this.state.message}</h1>
        </main>
      );
    }
  },

  _handleInfoChange: function () {
    this.setState({players: InfoStore.players, votes: InfoStore.votes});
  },

  _handleGameChange: function () {
    if (this.state.turnPhase === 'joining' ) {
      this._startVoting();
    } else if (this.state.turnPhase === 'revealing' ) {
      this.setState({game: GameStore.game});
      window.setTimeout(this._handleGuess, 2000);
    } else {
      this.setState({game: GameStore.game});
    }
  },

  _handleGuess: function () {
    GameStore.game.handleGuess();
    GameUtil.saveGame();
    if (GameStore.game.isOver()) {
      this.setState({game: null, message: 'You Won!'});
    } else {
      this._startVoting();
    }
  },

  _updateVoteCycle: function () {
    if (this.state.timeRemaining > 0) {
      this.setState({timeRemaining: this.state.timeRemaining - 1});
      this.votingTimeout = window.setTimeout(this._updateVoteCycle, 1000);
    } else {
      this.setState({turnPhase: 'revealing', timeRemaining: null});
      VoteUtil.processVotes(this._gameOver);
    }
  },

  _gameOver: function () {
    this.setState({game: null, message: 'Game Over!'});
  },

  _startVoting: function () {
    if (this.state.turnPhase === 'joining') {
      this.setState({
        game: GameStore.game,
        turnPhase: 'voting',
        timeRemaining: 60
      });
    } else {
      this.setState({
        game: GameStore.game,
        turnPhase: 'voting',
        timeRemaining: 15
      });
    }
    window.setTimeout(this._updateVoteCycle, 1000);
  }
});

module.exports = MainDisplay;
