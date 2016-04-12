var React = require('react');
var Card = require('./components/card');

var PlayerBoard = React.createClass({
  render: function () {
    return(
      <section className="section board group">
        { this._renderCards() }
      </section>
    );
  },

  _renderCards: function () {
    return this.props.board.cards.map(function(card, index) {
      return (
        <Card
          key={index}
          card={card}
          onClick={this.props.onClick.bind(null, index)}
        />
      );
    }.bind(this));
  },
});

module.exports = PlayerBoard;
