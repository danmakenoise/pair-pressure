import App from './components/App'
var React = require('react')
var ReactDOM = require('react-dom')

document.addEventListener('DOMContentLoaded', (event) => {
  var root = document.getElementById('pair-pressure')

  ReactDOM.render(
    <App />,
    root
  )
})
