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
    return {players: 0, game: null, turnPhase: 'ready', timeRemaining: null};
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
  },

  render: function () {
    if (this.state.game) {
      return (
        <section className="section display">
          <header className="header">
            <h1 className="headline">
              Pair Pressure
            </h1>
          </header>
          <MainBoard board={this.state.game.board}/>
          <Timer timeRemaining={this.state.timeRemaining} />
          <h1 className="headline">{GameStore.token}</h1>
          <h1 className='headline'>{this.state.players}</h1>
        </section>
      );
    } else {
      return (
        <section className='section'>
          <h1 className='headline'>{this.state.message}</h1>
        </section>
      );
    }
  },

  _handleInfoChange: function () {
    this.setState({players: InfoStore.players});
  },

  _handleGameChange: function () {
    if (this.state.turnPhase === 'ready' ) {
      this._startVoting();
    } else if (this.state.turnPhase === 'revealing' ) {
      this.setState({game: GameStore.game});
      window.setTimeout(this._handleGuess, 2000);
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
      window.setTimeout(this._updateVoteCycle, 1000);
    } else {
      this.setState({turnPhase: 'revealing', timeRemaining: null});
      VoteUtil.processVotes(this._gameOver);
    }
  },

  _gameOver: function () {
    this.setState({game: null, message: 'Game Over!'});
  },

  _startVoting: function () {
    this.setState({game: GameStore.game, turnPhase: 'voting', timeRemaining: 20});
    window.setTimeout(this._updateVoteCycle, 1000);
  }
});

module.exports = MainDisplay;
