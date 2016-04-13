var React = require('react');
var Card = require('./components/card');

var MainBoard = React.createClass({
  render: function () {
    return(
      <section className="section board group">
        { this._renderCards() }
      </section>
    );
  },

  _renderCards: function () {
    return this.props.board.cards.map(function(card, index) {
      var votes = this.props.votes[index] ? this.props.votes[index] : 0;

      return (
        <Card
          key={index}
          card={card}
          votes={votes / this.props.players}
        />
      );
    }.bind(this));
  },
});

module.exports = MainBoard;
