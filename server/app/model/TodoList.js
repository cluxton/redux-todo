'use strict';

const redis = require('../../config/redis').client;
const idEncoder = require('../../config/idEncoder');
const Promise = require('bluebird');
const _ = require('lodash');

const listKey = function(id) {
	return 'todolist:' + id;
};

var TodoList = module.exports = function(object) {
	if (object !== undefined) {
		this.id = object.id;
		this.title = object.title;
		this.todos = object.todos;
	} else {
		this.id = null;
		this.title = "New Todo List";
		this.todos = [
			{ title: "Do something", complete: false, id: "1" },
			{ title: "Do something else", complete: false, id: "2" },
			{ title: "Another thing to be done", complete: true, id: "3" }
		];
	}
	
	return this;
};

TodoList.prototype.save = function() {
	var self = this;

	return redis.incrAsync('identifier')
		.then(function(reply) {
			let hashId = idEncoder(reply)
			self.id = hashId;
			return self.update();
		})
};

TodoList.prototype.update = function(updates) {
	this.merge(updates);
	return redis.hmsetAsync(this.key(), [
		"title", this.title,
		"id", this.id,
		"todos", JSON.stringify(this.todos)
	]);
};

TodoList.prototype.merge = function(updates) {
	if (typeof(updates) === 'undefined') {
		return
	}

	if (updates.title !== undefined) {
		this.title = updates.title;
	}

	if (updates.todos !== undefined) {
		this.todos = updates.todos;
	}
}

TodoList.prototype.key = function() {
	return listKey(this.id);
}

module.exports.get = function(id) {
	let key = listKey(id);
	return new Promise(function(resolve, reject) {

		redis.hgetallAsync(listKey(id))
			.then(function(reply) {
				let list = reply;
				list.todos = JSON.parse(list.todos);
				resolve(new TodoList(list));
			})
			.catch(function(error) {
				reject(error)
			})
	})
};