var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var hashHistory = ReactRouter.hashHistory;

var Display = require('./components/display/display');
var Game = require('./game/game');

var routes = (
  <Route>
    <Route path='/' component={Display} />
    <Route path='/game/:id' component={Display} />
  </Route>
);

$( function() {
  var root = $('#pair-pressure')[0];

  ReactDOM.render(
    <Router history={ hashHistory }>{routes}</Router>,
    root
  );
});
