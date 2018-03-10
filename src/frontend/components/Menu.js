var React = require('react')
var Link = require('react-router').Link

const contextTypes = {
  router: React.PropTypes.object.isRequired
}

class Menu extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      roomCode: ''
    }

    this._renderJoinButton = this._renderJoinButton.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this._joinGame = this._joinGame.bind(this)
  }

  render () {
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
  }

  _renderJoinButton () {
    if (this.state.roomCode.length === 4) {
      return (
        <button className='button' onClick={this._joinGame}>
          Join Room!
        </button>
      )
    }
  }

  _handleChange () {
    if (this.refs.roomCode.value.length <= 4) {
      this.setState({roomCode: this.refs.roomCode.value})
    }
  }

  _joinGame () {
    if (this.refs.roomCode.value.length === 4) {
      var url = '/game/' + this.refs.roomCode.value.toLowerCase()
      this.context.router.push(url)
    }
  }
}

Menu.contextTypes = contextTypes
export default Menu
