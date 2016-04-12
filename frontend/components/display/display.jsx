var React = require('react');
var Board = require('./components/board/board');

var Display = React.createClass({
  getInitialState: function () {
    return {board: this.props.game.board, guessing: false};
  },

  render: function () {
    return (
      <section className="section display">
        <header className="header">
          <h1 className="headline">
            Pair Pressure
          </h1>
        </header>
        <Board board={this.state.board} onClick={this._makeGuess}/>
      </section>
    );
  },

  _makeGuess: function (idx) {
    if (!this.state.guessing) {
      this.props.game.chooseCard(idx);
      this.setState({ guessing: true, board: this.props.game.board });
      window.setTimeout(this._handleGuess, 2000);
    }
  },

  _handleGuess: function () {
    this.props.game.handleGuess();
    this.setState({ guessing: false, board: this.props.game.board });
  }
});

module.exports = Display;
