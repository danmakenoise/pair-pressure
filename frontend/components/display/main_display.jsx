var React = require('react');
var MainBoard = require('./components/board/main_board');
var GameActions = require('../../actions/game_actions');
var GameUtil = require('../../utils/game_util');
var GameStore = require('../../stores/game_store');

var MainDisplay = React.createClass({
  getInitialState: function () {
    return {game: null};
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
          <MainBoard board={this.state.game.board}/>
        </section>
      );
    } else {
      return <section></section>;
    }
  },

  _handleChange: function () {
    this.setState({game: GameStore.game});
  },
});

module.exports = MainDisplay;
