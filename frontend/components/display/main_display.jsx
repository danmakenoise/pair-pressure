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
        </section>
      );
    } else {
      return <section></section>;
    }
  },

  _handleGameChange: function () {
    if (this.state.turnPhase === 'ready' ) {
      this.setState({game: GameStore.game, turnPhase: 'voting', timeRemaining: 10});
      this.voteInterval = window.setInterval(this._updateVoteCycle, 1000);
    } else if (this.state.turnPhase === 'revealing' ) {
      this.setState({game: GameStore.game});
      window.setTimeout(this._handleGuess, 5000);
    }
  },

  _handleGuess: function () {
    GameStore.game.handleGuess();
    this.setState({game: GameStore.game, turnPhase: 'ready' });
  },

  _updateVoteCycle: function () {
    if (this.state.timeRemaining > 0) {
      this.setState({timeRemaining: this.state.timeRemaining - 1});
    } else {
      this.setState({turnPhase: 'revealing', timeRemaining: null});
      window.clearInterval(this.voteInterval);
      VoteUtil.processVotes();
    }
  },
});

module.exports = MainDisplay;
