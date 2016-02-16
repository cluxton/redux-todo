var nodemon = require('nodemon');
var path = require('path');
var livereload = require('livereload');

nodemon({
	verbose: true,
	verbose: true,
	colors: true,
	watch: [
		path.join(__dirname, '../app/styles')
	],
	ext: 'less',
	exec: 'npm run build:less'
});

server = livereload.createServer({
	port: process.env.LIVERELOAD_PORT || "35729"
});

server.watch(path.join(__dirname, "../server/public/styles.css"));
