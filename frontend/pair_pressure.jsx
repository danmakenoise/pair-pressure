var React = require('react');
var ReactDOM = require('react-dom');
var Display = require('./components/display/display');

$( function() {
  var root = $('#pair-pressure')[0];
  var PairPressure = window.PairPressure;
  var game = new PairPressure.Game();

  ReactDOM.render(
    <Display game={game}/>,
    root
  );
});
