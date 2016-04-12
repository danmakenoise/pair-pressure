var React = require('react');
var PlayerBoard = require('./components/board/player_board');
var GameActions = require('../../actions/game_actions');
var GameUtil = require('../../utils/game_util');
var GameStore = require('../../stores/game_store');

var PlayerDisplay = React.createClass({
  getInitialState: function () {
    GameActions.receiveToken(this.props.params.id);
    return {game: null, voting: false};
  },

  componentDidMount: function () {
    this.listener = GameStore.addListener(this._handleChange);
    GameUtil.loadGame(this.props.params.id);
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
          <PlayerBoard board={this.state.game.board} onClick={this._castVote}/>
        </section>
      );
    } else {
      return <section></section>;
    }
  },

  _handleChange: function () {
    this.setState({game: GameStore.game});
  },

  _castVote: function (idx) {
    if (!this.state.voting) {
      this.state.game.chooseCard(idx);
      this.setState({ guessing: true });
      window.setTimeout(this._handleGuess, 2000);
    }
  }
});

module.exports = PlayerDisplay;
