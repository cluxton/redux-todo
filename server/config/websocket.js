'use strict';

const config = require('./config');
const glob = require('glob');
const WebSocketServer = require("ws").Server;
const map = require('lodash/map');
const qs = require('qs');

const parseWebsocketUrl = function(upgradeReq) {
	let components = upgradeReq.url.split('?');
	return {
		path: components[0],
		params: components.length > 1 ? qs.parse(components[1]) : {}
	}
}

const websocketHandlers = map(glob.sync(config.root + '/app/websockets/*.js'), function(path) {
	return require(path);
});

let initWebsocket = module.exports = function(app, server) {

  //Enable websockets
  let wss = new WebSocketServer({ server: server });

  wss.on("connection", function(ws) {
  	  websocketHandlers.forEach(function(handler) {
  	  	handler(ws, parseWebsocketUrl(ws.upgradeReq))
  	  });
  });
}