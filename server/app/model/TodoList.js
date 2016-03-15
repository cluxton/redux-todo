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
		console.log(object)
		this.id = object.id;
		this.name = object.name;
	} else {
		this.id = null;
		this.name = "Todo List";
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
		"name", this.name,
		"id", this.id
	]);
};

TodoList.prototype.merge = function(updates) {
	if (typeof(updates) === 'undefined') {
		return
	}

	if (updates.name !== undefined) {
		this.name = updates.name;
	}
}

TodoList.prototype.key = function() {
	return listKey(this.id);
}

TodoList.prototype.insertTodo = function(todo) {
	let todoKey = 'todo:' + todo.id
	return redis.multi()
		.set(todoKey, JSON.stringify(todo))
		.rpush('todoList:' + this.id + ':todos', todoKey)
		.execAsync()
}

TodoList.prototype.getTodos = function() {
	let key = this.key() + ':todos'
	return redis
		.sortAsync(key, 'by', 'nosort', 'get', '*');

}

module.exports.get = function(id) {

	let key = listKey(id);

	return new Promise(function(resolve, reject) {

		redis.multi()
			.hgetall(listKey(id))
			.sort(key + ':todos', 'by', 'nosort', 'get' , '*')
			.execAsync()
			.then(function(replies) {
				if (replies[0] == null) {
					resolve(null);
					return;
				}

				let list = replies[0];
				list.todos = _.map(replies[1], function(val) {
					return JSON.parse(val);
				});

				resolve(list);
			})
			.catch(function(error) {
				reject(error)
			})
	})
};