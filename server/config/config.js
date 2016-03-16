var path = require('path');

var env = process.env['NODE_ENV'] || 'development';
var redisUrl = process.env['REDISTOGO_URL'] || null;

var configurations = {
	development: {
		root : path.join(__dirname, "../"),
		port : 3000,
		hashIDSalt: "default",
		redisUrl: redisUrl,
		webpack: process.env.WEBPACK_PORT !== undefined,
		livereload: process.env.LIVERELOAD_PORT !== undefined,
		stacktrace : true,
		locals : {
			'LIVERELOAD_ENABLED': true
		}
	},

	production: {
		root : path.join(__dirname, "../"),
		port: process.env.PORT || "3000",
		hashIDSalt: process.env.HASHID_SALT || "default",
		redisUrl: redisUrl,
		webpack: false,
		livereload: false,
		stacktrace : false,
		locals : { }
	}
}

var config = configurations[env];
config.env = env;

module.exports = config;