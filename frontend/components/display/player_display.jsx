var React = require('react');
var PlayerBoard = require('./components/board/player_board');
var GameActions = require('../../actions/game_actions');
var GameUtil = require('../../utils/game_util');
var GameStore = require('../../stores/game_store');
var VoteStore = require('../../stores/vote_store');
var VoteUtil = require('../../utils/vote_util');

var PlayerDisplay = React.createClass({
  getInitialState: function () {
    GameActions.receiveToken(this.props.params.id);
    return {game: null, voted: false};
  },

  componentDidMount: function () {
    this.gameListener = GameStore.addListener(this._handleGameChange);
    this.voteListener = VoteStore.addListener(this._handleVoteChange);
    GameUtil.loadGame(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.gameListener.remove();
    this.voteListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    GameUtil.loadGame(newProps.params.id);
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
          <PlayerBoard
            board={this.state.game.board}
            onClick={this._castVote}
            voted={this.state.voted}
          />
        </section>
      );
    } else {
      return <section></section>;
    }
  },

  _handleGameChange: function () {
    this.setState({game: GameStore.game});
  },

  _handleVoteChange: function () {
    this.setState({voted: VoteStore.voted });
  },

  _castVote: function (idx) {
    if (!this.state.voted) {
      this.setState({voted: true});
      VoteUtil.castVote(idx);
    }
  }
});

module.exports = PlayerDisplay;
