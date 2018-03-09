var React = require('react')
var ReactDOM = require('react-dom')

var App = require('./components/app')

document.addEventListener('DOMContentLoaded', (event) => {
  var root = document.getElementById('pair-pressure')

  ReactDOM.render(
    <App />,
    root
  )
})
