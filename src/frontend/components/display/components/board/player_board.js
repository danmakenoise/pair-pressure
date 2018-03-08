var React = require('react')
var Card = require('./components/card')

var PlayerBoard = React.createClass({
  render: function () {
    console.log(this.props.voted)
    return (
      <section className='section board group'>
        { this._renderCards() }
      </section>
    )
  },

  _renderCards: function () {
    return this.props.board.cards.map(function (card, index) {
      return (
        <Card
          key={index}
          card={card}
          onClick={this.props.onClick.bind(null, index)}
          voted={this.props.voted === index}
          chosen={this.props.compChoice === index}
        />
      )
    }.bind(this))
  }
})

module.exports = PlayerBoard
