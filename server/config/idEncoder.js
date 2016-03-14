'use strict';
const config = require('./config');
const Hashids = require('hashids');
const encoder = new Hashids(config.hashIDSalt);

let encode = module.exports = function(id) {
	return encoder.encode(id, id, id);
}