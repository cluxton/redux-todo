'use strict';

const filter = require('lodash/filter');

const SocketRepository = function() {
	this.openConnections = {} // listId : [ { socketId: 123, ws: {...} }]

	return this;
}

SocketRepository.prototype.addSocket = function(listId, socketId, websocket) {
	//Subscribe the socket to updates
	if (typeof(this.openConnections[listId]) === 'undefined') {
		this.openConnections[listId] = [];
	}

	this.openConnections[listId].push({
		listId: listId,
		socketId: socketId,
		ws: websocket
	});
}

SocketRepository.prototype.getSockets = function(listId) {
	if (typeof(this.openConnections[listId]) === 'undefined') {
		return []
	}

	return this.openConnections[listId];
}

SocketRepository.prototype.getSocketsExcluding = function(listId, socketId) {
	return filter(this.getSockets(listId), function(s) {
		return s.socketId != socketId;
	});
}

SocketRepository.prototype.removeSocket = function(listId, websocket) {
	for(let i = 0; i < this.openConnections[listId].length; i++) {
		if (this.openConnections[listId][i].ws === websocket) {
			this.openConnections[listId].splice(i, 1);
			if (this.openConnections[listId].length < 1) {
				delete this.openConnections[listId];
			}
			break;
		}
	}
}

const instance = new SocketRepository()

module.exports = instance