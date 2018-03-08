var React = require('react')
var Link = require('react-router').Link

var Menu = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { roomCode: '' }
  },

  render: function () {
    return (
      <main className='main menu'>
        <input
          ref='roomCode'
          type='text'
          value={this.state.roomCode}
          className='input'
          onChange={this._handleChange}
          placeholder='Enter Room Code' />
        {this._renderJoinButton()}
        <Link to='/game' className='link'>Start a Multiplayer Game</Link>
        <Link to='/solo' className='link link--brown'>Start a Solo Game</Link>
        <Link to='/help' className='link'>How to Play</Link>
        <p className='p--about'>
            Pair Pressure was created by Dan Phillips. Check out his
          <a className='link--inline' href='http://www.danphillips.io'> Portfolio</a> or find him on
          <a className='link--inline' href='https://www.github.com/danmakenoise'> Github</a>
        </p>
      </main>
    )
  },

  _renderJoinButton: function () {
    if (this.state.roomCode.length === 4) {
      return (
        <button className='button' onClick={this._joinGame}>
          Join Room!
        </button>
      )
    }
  },

  _handleChange: function () {
    if (this.refs.roomCode.value.length <= 4) {
      this.setState({roomCode: this.refs.roomCode.value})
    }
  },

  _joinGame: function () {
    if (this.refs.roomCode.value.length === 4) {
      var url = '/game/' + this.refs.roomCode.value.toLowerCase()
      this.context.router.push(url)
    }
  }
})

module.exports = Menu
