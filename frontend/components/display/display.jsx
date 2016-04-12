var React = require('react');
var Board = require('./components/board/board');

var Display = React.createClass({
  render: function () {
    return (
      <section className="section display">
        <header className="header">
          <h1 className="headline">
            Pair Pressure
          </h1>
        </header>
        <Board board={this.props.game.board}/>
      </section>
    );
  }
});

module.exports = Display;
