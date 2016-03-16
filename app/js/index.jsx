import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './redux/configureStore'
import Actions from './redux/actions'
import ActionWebsocket from './util/ActionWebsocket'
import createRouter from './routes'

const store = configureStore()

//Shim for Date.now()
if (!Date.now) {
    Date.now = function() { return new Date().getTime() }
}

//Restore any saved state from local storage
// Disabling local storage for now... causing problems with collaboration
if ('localStorage' in window) {
	let savedState = window.localStorage.getItem("appState")
	if (savedState !== null) {
		store.dispatch({
			type: Actions.LOAD_SAVED_STATE,
			state: JSON.parse(savedState)
		})
	}
}

ActionWebsocket.setStore(store)

ReactDOM.render(createRouter(store), document.getElementById("content"))

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

