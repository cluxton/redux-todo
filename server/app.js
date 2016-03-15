var express = require('express'),
  http = require('http'),
  config = require('./config/config');

var app = express();
var server = http.createServer(app);

if (config.webpack === true) {
	//Proxies all /bundle/* requests to the webpack dev server (if enabled)
	require('./config/webpack-proxy')(app);
}

require('./config/express')(app, config);
require('./config/websocket')(app, server);

server.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});
