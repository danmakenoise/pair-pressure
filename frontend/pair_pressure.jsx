var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var hashHistory = ReactRouter.hashHistory;

var Menu = require('./components/menu');
var MainDisplay = require('./components/display/main_display');
var PlayerDisplay = require('./components/display/player_display');
var Game = require('./game/game');

var routes = (
  <Route>
    <Route path='/' component={Menu} />
    <Route path='/game' component={MainDisplay} />
    <Route path='/game/:id' component={PlayerDisplay} />
  </Route>
);

$( function() {
  var root = $('#pair-pressure')[0];

  ReactDOM.render(
    <Router history={ hashHistory }>{routes}</Router>,
    root
  );
});
