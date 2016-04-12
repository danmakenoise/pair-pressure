var React = require('react');
var ReactDOM = require('react-dom');
var Display = require('./components/display/display');
var Game = require('./game/game');

$( function() {
  var root = $('#pair-pressure')[0];
  var PairPressure = window.PairPressure;
  var game = new Game();
  game.startRound();

  ReactDOM.render(
    <Display game={game}/>,
    root
  );
});
