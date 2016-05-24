import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import storeConfig from './store/config'
import { Router, browserHistory, Redirect } from 'react-router'
import routes from './routes'
import initailState from './store/initial'

const store = storeConfig(initailState)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
