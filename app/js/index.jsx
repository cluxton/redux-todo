import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './redux/configureStore'
import Root from './containers/Root'

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("content"))

//Register the service worker
if (typeof(navigator) !== 'undefined' && 'serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('sw.min.js', { scope: '/' })
		.then(function(registration) {
			console.log('ServiceWorker registration successful with scope: ',    registration.scope);
		})
		.catch(function(err) {
			console.log("Service worker registration failed:", err)
		});
}
