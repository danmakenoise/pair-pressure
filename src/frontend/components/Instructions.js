import PropTypes from 'prop-types'
var React = require('react')
var Link = require('react-router').Link

const contextTypes = {
  router: PropTypes.object.isRequired
}

class Instructions extends React.Component {
  constructor (props) {
    super(props)

    this._renderJoinButton = this._renderJoinButton.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this._joinGame = this._joinGame.bind(this)
  }

  render () {
    return (
      <main className='main instructions'>
        <article className='article'>
          <h2 className='subheader'>
            Instructions
          </h2>
          <p className='text instructions__text'>
            Pair Pressure is a cooperative card-matching game! On a computer,
            click 'Start New Game' on the main page. Then, using a phone or
            tablet, go to pair.danphillips.io and put in the room code
            you see at the bottom of the screen!
          </p>
          <p className='text instructions__text'>
            The computer will choose a card to reveal, and all players must vote
             for where they think the matching card is. You have 15 seconds to
             put in your vote! The most voted for card will be selected. Try to
             find all of the pairs!
          </p>
        </article>
        <Link to='/' className='link'>Go Back</Link>
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

Instructions.contextTypes = contextTypes
export default Instructions
