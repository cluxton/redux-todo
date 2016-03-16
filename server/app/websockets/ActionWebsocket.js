'use strict';
const SocketRepository = require('../repository/SocketRepository');
const redisClient = require('../../config/redis').client;
const channelClient = require('../../config/redis').createRedisClient();
const shortid = require('shortid');
const TodoList = require('../model/TodoList');

const UPDATE_CHANNEL = 'listUpdates';

channelClient.subscribe(UPDATE_CHANNEL)

channelClient.on('message', function(channel, channelMessage) {
	let data = JSON.parse(channelMessage);
	let sockets = SocketRepository.getSocketsExcluding(data.listId, data.socketId);

	sockets.forEach(function(socket) {
		try {
			socket.ws.send(JSON.stringify(data.message))
		} catch(err) {

		}
	});
})

channelClient.on('error', function(err) {
	
})

module.exports = function(ws, url) {

	if (!url.path.startsWith('/actions')) {
		return;
	}

	if (!url.params.userId || !url.params.listId) {
		ws.close();
		return;
	}

	let listId = url.params.listId;
	let userId = url.params.userId;
	let channel = 'listUpdates:' + listId;

	let socketId = userId + ':' + shortid.generate();

	//Subscribe the socket to updates
	SocketRepository.addSocket(listId, socketId, ws);

	ws.on('message', function(message) {
		let data = JSON.parse(message);

		switch(data.type) {
			case "dispatch":

				data.action.broadcast = false;

				let channelMessage = { 
					socketId: socketId,
					listId: listId,
					message: data 
				};

				redisClient.publish(UPDATE_CHANNEL, JSON.stringify(channelMessage));

				break;
			default:
				break;
		}
	})


	ws.on('close', function() {
		//Unsubscribe socket from further updates
		SocketRepository.removeSocket(listId, ws);
	})

	//On connection, we want to send a snapshot of the current state.
	TodoList.get(listId)
		.then(function(todoList) {
			if (todoList !== null) {
				ws.send(JSON.stringify({
					type: "dispatch",
					action: {
						type : "TODO_LIST_STATE_RECEIVED",
						todoList: todoList
					}
				}))
			}
		})
		
	return true;
};
