import PropTypes from 'prop-types'
import Instructions from './Instructions'
import MainDisplay from './MainDisplay'
import Menu from './Menu'
import PlayerDisplay from './PlayerDisplay'
import SoloDisplay from './SoloDisplay'

const { hot } = require('react-hot-loader')
var React = require('react')
var ReactRouter = require('react-router')

var Route = ReactRouter.Route
var Router = ReactRouter.Router
var hashHistory = ReactRouter.hashHistory
var IndexRoute = ReactRouter.IndexRoute

const contextTypes = {
  router: PropTypes.object.isRequired
}

class PairPressure extends React.Component {
  constructor (props) {
    super(props)

    this._goHome = this._goHome.bind(this)
  }

  render () {
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
  }

  _goHome () {
    this.context.router.push('/')
  }
}

PairPressure.contextTypes = contextTypes

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

export default hot(module)(App)
