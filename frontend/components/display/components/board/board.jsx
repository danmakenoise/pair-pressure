var React = require('react');
var Card = require('./components/card');

var Board = React.createClass({
  render: function () {
    return(
      <section className="section board group">
        { this._renderCards() }
      </section>
    );
  },

  _renderCards: function () {
    return this.props.board.cards.map(function(card, index) {
      return <Card key={index} card={card} />;
    });
  }
});

module.exports = Board;
