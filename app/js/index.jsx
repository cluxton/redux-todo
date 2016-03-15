import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './redux/configureStore'

import ActionWebsocket from './util/ActionWebsocket'
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
import Root from './containers/Root'
import HomeView from './views/HomeView'

//Shim for Date.now()
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

let initialState = {}

//Restore any saved state from local storage
if ('localStorage' in window) {
	let savedState = window.localStorage.getItem("appState")
	if (savedState !== null) {
		initialState = JSON.parse(savedState)
	}
}

const store = configureStore(initialState);

const App = (props)=> {
	return <Root store={store}>{props.children}</Root>
}

//ReactDOM.render(<Root store={store} />, document.getElementById("content"))

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={HomeView}/>
			<Route path="/todo/:id" component={HomeView}/>
		</Route>
	</Router>
), document.getElementById("content"))

//Register the service worker
if (false && typeof(navigator) !== 'undefined' && 'serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('worker.js', { scope: '/' })
		.then(function(registration) {
			console.log('ServiceWorker registration successful with scope: ',    registration.scope);
		})
		.catch(function(err) {
			console.log("Service worker registration failed:", err)
		});
}



ActionWebsocket.setStore(store);
ActionWebsocket.connect('/actions?userId=123&listId=cd1d12');