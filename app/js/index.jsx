import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './redux/configureStore'
import Root from './containers/Root'
injectTapEventPlugin();

let initialState = {}

//Restore any saved state from local storage
if ('localStorage' in window) {
	let savedState = window.localStorage.getItem("appState")
	if (savedState !== null) {
		initialState = JSON.parse(savedState)
	}
}

const store = configureStore(initialState);

ReactDOM.render(<Root store={store} />, document.getElementById("content"))

//Register the service worker
if (typeof(navigator) !== 'undefined' && 'serviceWorker' in navigator && false) {
	navigator.serviceWorker
		.register('worker.js', { scope: '/' })
		.then(function(registration) {
			console.log('ServiceWorker registration successful with scope: ',    registration.scope);
		})
		.catch(function(err) {
			console.log("Service worker registration failed:", err)
		});
}
