var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;

var Menu = require('./components/menu');
var MainDisplay = require('./components/display/main_display');
var PlayerDisplay = require('./components/display/player_display');
var Game = require('./game/game');

var PairPressure = React.createClass({
  render: function () {
    return (
      <section className='section pair-pressure'>
          <header className="header">
            <h1 className="headline">
              Pair Pressure
            </h1>
          </header>
          { this.props.children }
      </section>
    );
  }
});

var routes = (
  <Route>
    <Route path='/' component={PairPressure}>
      <IndexRoute component={Menu} />
      <Route path='/game' component={MainDisplay} />
      <Route path='/game/:id' component={PlayerDisplay} />
    </Route>
  </Route>
);

$( function() {
  var root = $('#pair-pressure')[0];

  ReactDOM.render(
    <Router history={ hashHistory }>{routes}</Router>,
    root
  );
});
