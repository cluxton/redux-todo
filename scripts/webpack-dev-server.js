var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var webpackHost = process.env.DEV_HOST || 'localhost';
var webpackPort = process.env.WEBPACK_PORT || '8099';

var webpackConfig = require('../webpack-config')({
	minify: false,
	devserver: true,
	webpackHost: webpackHost,
	webpackPort: webpackPort
});

var compiler = webpack(webpackConfig);

var devServer = new WebpackDevServer(compiler, {
  noInfo: false,
  publicPath: "/bundle/",
  stats: { colors: true }
});

devServer.listen(webpackPort, webpackHost, function() { });
