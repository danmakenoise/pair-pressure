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
var SoloDisplay = require('./components/display/solo_display');
var Game = require('./game/game');
var Instructions = require('./components/instructions');

var PairPressure = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <section className='section pair-pressure'>
          <header className="header">
            <h1 onClick={this._goHome} className="headline headline--clickable">
              Pair Pressure
            </h1>
          </header>
          { this.props.children }
      </section>
    );
  },

  _goHome: function () {
    this.context.router.push('/');
  }
});

var routes = (
  <Route>
    <Route path='/' component={PairPressure}>
      <IndexRoute component={Menu} />
      <Route path='/game' component={MainDisplay} />
      <Route path='/solo' component={SoloDisplay} />
      <Route path='/game/:id' component={PlayerDisplay} />
      <Route path='/help' component={Instructions} />
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
