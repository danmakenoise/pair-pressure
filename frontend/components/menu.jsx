var React = require('react');
var Link = require('react-router').Link;

var Menu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return(
      <main className='main menu'>
        <Link to='/game' className='link'>New Game</Link>
        <input
          ref='roomCode'
          type='text' className='input' placeholder='Room Code'></input>
        <button className='button' onClick={this._joinGame}>
          Join Game in Progress
        </button>
      </main>
    );
  },

  _joinGame: function () {
    if(this.refs.roomCode.value.length === 3) {
      var url = '/game/' + this.refs.roomCode.value;
      this.context.router.push(url);
    }
  }
});

module.exports = Menu;
