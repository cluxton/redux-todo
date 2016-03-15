'use strict';

let activeSockets = { } // listId : [websocket1, websocket2]

module.exports = function(ws, url) {

	if (!url.path.startsWith('/actions')) {
		return;
	}

	if (!url.params.userId || !url.params.listId) {
		console.log("Not enough info");
		return;
	}

	let listId = url.params.listId;
	let userId = url.params.userId;

	//Subscribe the socket to updates
	if (!(listId in activeSockets)) {
		activeSockets[listId] = [];
	}

	activeSockets[listId].push({
		userId: userId,
		listId: listId,
		ws: ws
	});

	ws.on('message', function(message) {
		let data = JSON.parse(message);


		switch(data.type) {
			case "dispatch":
				//We want to forward any actions to all other clients
				let sockets = activeSockets[listId];
				sockets.forEach(function(socket) {
					//ignore the socket that sent the message
					if (socket.ws == ws) {
						return;
					}

					socket.ws.send(message)
				});

				break;
			default:
				break;
		}
	})


	ws.on('close', function() {
		//Unsubscribe socket from further updates
		for(let i = 0; i < activeSockets[listId].length; i++) {
			if (activeSockets[listId][i].ws === ws) {
				activeSockets[listId].splice(i, 1);
				if (activeSockets[listId].length < 1) {
					delete activeSockets[listId];
				}
				break;
			}
		}
	})

	return true;
};
