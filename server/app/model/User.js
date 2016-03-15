'use strict';

const redis = require('../../config/redis').client;
const idEncoder = require('../../config/idEncoder');
const Promise = require('bluebird');

const userKey = function(id) {
	return 'users:' + id;
};

var User = module.exports = function(object) {
	if (object !== undefined) {
		this.id = object.id;
		this.name = object.name;
	} else {
		this.id = null;
		this.name = "Guest";
	}
	
	return this;
};

User.prototype.save = function() {
	var self = this;

	return redis.incrAsync('identifier')
		.then(function(reply) {
			let hashId = idEncoder(reply)
			self.id = hashId;
			return self.update();
		})
};

User.prototype.update = function(updates) {
	this.merge(updates);

	return redis.hmset(this.key(), [
		"name", this.name,
		"id", this.id
	]);
};

User.prototype.merge = function(updates) {
	if (typeof(updates) === 'undefined') {
		return
	}

	if (updates.name !== undefined) {
		this.name = updates.name;
	}
}

User.prototype.key = function() {
	return userKey(this.id);
}

module.exports.get = function(id, callback) {
	return new Promise(function(resolve, reject) {
		redis.hgetallAsync(userKey(id))
		.then(function(reply) {
			
			if (reply == null) {
				resolve(reply);
				return;
			}

			resolve(new User(reply));
		})
		.catch(function(err) {
			reject(err);
		})
	})
};