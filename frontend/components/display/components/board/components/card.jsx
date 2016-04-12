var React = require('react');

var Card = React.createClass({
  render: function() {
    if (this.props.card.flipped) {
      return (
        <section className={'section card card--' + this.props.card.color}>
          <p className='text card__text'>{this.props.card.symbol}</p>
        </section>
      );
    } else {
      return (
        <section
          className={this._determineClassName()}
          onClick={this.props.onClick}
        >
          <p className='text card__text'>*</p>
        </section>
      );
    }
  },

  _determineClassName: function () {
    var selected = this.props.voted ? ' card--voted' : '';
    return 'section card card--down' + selected;
  }
});

module.exports = Card;
