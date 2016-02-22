import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './redux/configureStore'
import Root from './containers/Root'

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("content"))