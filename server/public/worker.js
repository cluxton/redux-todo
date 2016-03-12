(global => {
	'use strict';

	// Load the sw-toolbox library.
	importScripts('/js/sw-toolbox.js');

	// Ensure that our service worker takes control of the page as soon as possible.
	global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
	global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
	
	toolbox.options.cache.name="todoapp-v2"

	toolbox.precache(['/']);

	toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
		origin: /\.googleapis\.com$/
	});

	toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
		origin: /\.gstatic\.com$/
	});

	toolbox.router.get('/', global.toolbox.cacheFirst, { });
	toolbox.router.get('/manifest.json', global.toolbox.cacheFirst, { });
	toolbox.router.get('/bundle/*', global.toolbox.cacheFirst, { });
	toolbox.router.get('/js/*', global.toolbox.cacheFirst, { });
	toolbox.router.get('/styles.css', global.toolbox.cacheFirst, { });

})(self);