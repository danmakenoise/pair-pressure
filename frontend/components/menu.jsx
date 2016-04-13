var React = require('react');
var Link = require('react-router').Link;

var Menu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function() {
    return(
      <main className='main menu'>
        <input
          ref='roomCode'
          type='text' className='input' placeholder='Enter Room Code'></input>
        <button className='button' onClick={this._joinGame}>
          Submit Room Code
        </button>
        <Link to='/game' className='link'>Start a New Game</Link>
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
