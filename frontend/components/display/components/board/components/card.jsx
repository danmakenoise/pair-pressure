var React = require('react');

var Card = React.createClass({
  render: function() {
    if (this.props.card.flipped) {
      return (
        <section className={'section card card--' + this.props.card.color}>
          <p>{this.props.card.symbol}</p>
        </section>
      );
    } else {
      return (
        <section
          className='section card card--down'
          onClick={this.props.onClick}
        >
          <p>*</p>
        </section>
      );
    }
  }
});

module.exports = Card;
