import { BrowserRouter, Route, withRouter } from 'react-router-dom'
import Instructions from './Instructions'
import MainDisplay from './MainDisplay'
import Menu from './Menu'
import PlayerDisplay from './PlayerDisplay'
import SoloDisplay from './SoloDisplay'

const { hot } = require('react-hot-loader')
var React = require('react')

class _PairPressure extends React.Component {
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
    this.props.history.push('/')
  }
}

const PairPressure = withRouter(_PairPressure)

var routes = (
  <PairPressure>
    <Route exact path='/' component={Menu} />
    <Route exact path='/game' component={MainDisplay} />
    <Route path='/solo' component={SoloDisplay} />
    <Route path='/game/:id' component={PlayerDisplay} />
    <Route path='/help' component={Instructions} />
  </PairPressure>
)

var App = () => <BrowserRouter>{routes}</BrowserRouter>

export default hot(module)(App)
