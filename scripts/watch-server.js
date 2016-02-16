var nodemon = require('nodemon');
var path = require('path');

nodemon({
	verbose: true,
	colors: true,
	watch: [
		path.join(__dirname, '../server/app'),
		path.join(__dirname, '../server/*.js')
	],
	ext: 'js',
	exec: 'npm run start'
});
