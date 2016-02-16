var httpProxy = require('http-proxy');
var webpackHost = process.env.DEV_HOST || 'localhost';
var webpackPort = process.env.WEBPACK_PORT || '8099';

module.exports = function(app) {

	var proxy = httpProxy.createProxyServer({
		target: {
	    	host: webpackHost,
	    	port: webpackPort
    	}
    });

	app.all('/bundle/*', function (req, res) {
    	proxy.web(req, res);
  	});

};
