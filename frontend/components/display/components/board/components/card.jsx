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
          <p className='text card__text'>&nbsp;</p>
        </section>
      );
    }
  },

  _determineClassName: function () {
    var selected = this.props.voted ? ' card--voted' : '';
    var votedFor = '';

    if (this.props.votes > 0.75) {
      votedFor = ' card--most';
    } else if (this.props.votes > 0.50) {
      votedFor = ' card--many';
    } else if (this.props.votes > 0) {
      votedFor = ' card--some';
    }

    return 'section card card--down' + selected + votedFor;
  }
});

module.exports = Card;
