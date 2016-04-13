var React = require('react');

var Timer = React.createClass({
  render: function() {
    return (
      <section className='section timer'>
        <p className='text timer__text'>
          { this.props.display }
        </p>
      </section>
    );
  }
});

module.exports = Timer;
