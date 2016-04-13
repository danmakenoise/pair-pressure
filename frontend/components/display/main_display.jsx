var React = require('react');
var MainBoard = require('./components/board/main_board');
var GameActions = require('../../actions/game_actions');
var GameUtil = require('../../utils/game_util');
var GameStore = require('../../stores/game_store');
var VoteUtil = require('../../utils/vote_util');
var Timer = require('./components/timer');

var MainDisplay = React.createClass({
  getInitialState: function () {
    return {game: null, turnPhase: 'ready', timeRemaining: null};
  },

  componentDidMount: function () {
    this.listener = GameStore.addListener(this._handleGameChange);
    GameUtil.startNewGame();
  },

  componentWillUnmount: function () {
    this.listener.remove();
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
        </section>
      );
    } else {
      return <section></section>;
    }
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
    this._startVoting();
  },

  _updateVoteCycle: function () {
    if (this.state.timeRemaining > 0) {
      this.setState({timeRemaining: this.state.timeRemaining - 1});
      window.setTimeout(this._updateVoteCycle, 1000);
    } else {
      this.setState({turnPhase: 'revealing', timeRemaining: null});
      VoteUtil.processVotes();
    }
  },

  _startVoting: function () {
    this.setState({game: GameStore.game, turnPhase: 'voting', timeRemaining: 30});
    window.setTimeout(this._updateVoteCycle, 1000);
  }
});

module.exports = MainDisplay;
