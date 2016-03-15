'use strict;';
const redis = require('../../config/redis').client;
const redlock = require('../../config/redis').redlock;

const UpdateIntervalMs = 5000;
const BatchSize = 20;
const ChangeListKey = 'todoListChanges:'

const UpdateService = function() {
	
	this.updateTimeout = null;
	this.lastChanges = Date.now();



	return this;
}

UpdateService.prototype.addListener = function(websocket) {

}

UpdateService.prototype.publishActionToChannel = function(listId, action) {

}

module.exports = new UpdateService()

/*
REDIS notes


MULTI
	LRANGE 0 5
	LTRIM 6 -1
EXEC


 */