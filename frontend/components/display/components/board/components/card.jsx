var React = require('react');

var Card = React.createClass({
  render: function() {
    return(
      <section className={'section card card--' + this.props.card.color}>
        <p>{this.props.card.symbol}</p>
      </section>
    );
  }
});

module.exports = Card;
