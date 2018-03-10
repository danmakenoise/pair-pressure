import MainDisplay from './MainDisplay'
const { hot } = require('react-hot-loader')
var React = require('react')
var ReactRouter = require('react-router')

var Route = ReactRouter.Route
var Router = ReactRouter.Router
var hashHistory = ReactRouter.hashHistory
var IndexRoute = ReactRouter.IndexRoute

var Menu = require('./menu')
var PlayerDisplay = require('./display/player_display')
var SoloDisplay = require('./display/solo_display')
var Instructions = require('./instructions')

var PairPressure = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <section className='section pair-pressure'>
        <header className='header'>
          <h1 onClick={this._goHome} className='headline headline--clickable'>
              Pair Pressure
          </h1>
        </header>
        { this.props.children }
      </section>
    )
  },

  _goHome: function () {
    this.context.router.push('/')
  }
})

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
)

var App = () => <Router history={hashHistory}>{routes}</Router>

module.exports = hot(module)(App)
