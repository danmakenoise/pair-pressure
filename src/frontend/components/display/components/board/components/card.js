var React = require('react')

var Card = React.createClass({
  render: function () {
    if (this.props.card.flipped) {
      return (
        <section className={this._determineRevealedCardClassName()}>
          <p className='text card__text'>{this.props.card.symbol}</p>
        </section>
      )
    } else {
      return (
        <section
          className={this._determineHiddenCardClassName()}
          onClick={this.props.onClick}
        >
          <p className='text card__text'>&nbsp;</p>
        </section>
      )
    }
  },

  _determineRevealedCardClassName: function () {
    var chosen = this.props.chosen ? ' card--chosen' : ''
    return 'section card card--' + this.props.card.color + chosen
  },

  _determineHiddenCardClassName: function () {
    var selected = this.props.voted ? ' card--voted' : ''

    var votedFor = ''

    if (this.props.votes > 0.75) {
      votedFor = ' card--most'
    } else if (this.props.votes > 0.50) {
      votedFor = ' card--many'
    } else if (this.props.votes > 0) {
      votedFor = ' card--some'
    }

    return 'section card card--down' + selected + votedFor
  }
})

module.exports = Card
