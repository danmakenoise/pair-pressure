var React = require('react');
var Board = require('./components/board/board');
var GameUtil = require('../../utils/game_util');
var GameStore = require('../../stores/game_store');

var Display = React.createClass({
  getInitialState: function () {
    if (this.props.params.id) {
      // Load game
    } else {
      return {game: null, guessing: false};
    }
  },

  componentDidMount: function () {
    this.listener = GameStore.addListener(this._handleChange);
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
          <Board board={this.state.game.board} onClick={this._makeGuess}/>
        </section>
      );
    } else {
      return <section></section>;
    }
  },

  _handleChange: function () {
    this.setState({game: GameStore.game});
  },

  _handleGuess: function () {
    this.state.game.handleGuess();
    this.setState({guessing: false});
  },

  _makeGuess: function (idx) {
    if (!this.state.guessing) {
      this.state.game.chooseCard(idx);
      this.setState({ guessing: true });
      window.setTimeout(this._handleGuess, 2000);
    }
  }
});

module.exports = Display;
