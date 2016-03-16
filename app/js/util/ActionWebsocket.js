const UPDATE_INTERVAL = 500

class ActionWebsocket {
	constructor() {
		let self = this;
		this.store = null;
		this.ws = null;
		this.statusInterval = null;
		this.previousReadyState = -1;
	}

	setStore(store) {
		this.store = store;
	}

	connect(url) {

		let isHttps = window.location.href.substring(0, 5) === 'https';
		let protocol = isHttps ? 'wss://' : 'ws://';
		let domain = window.location.href.split('/')[2];

		this.ws = new WebSocket(`${protocol}${domain}${url}`)
		this.ws.onmessage = this._onMessage.bind(this)

		this._checkStatus()
		this.statusInterval = setInterval(this._checkStatus.bind(this), UPDATE_INTERVAL)
	}

	sendMessage(message) {
		this.ws.send(JSON.stringify(message))
	}

	disconnect() {
		if (this.ws != null) {
			this.ws.close()
		}
		this.ws = null;

		clearInterval(this.statusInterval)
		this.statusInterval = null;
	}

	_checkStatus() {
		if(this.ws.readyState != this.previousReadyState) {
			this.store.dispatch({
				type: "CONNECTION_STATUS_CHANGED",
				status: this.ws.readyState
			})
		}

		this.previousReadyState = this.ws.readyState
	}

	_onMessage(message) {
		let data = JSON.parse(message.data)
		if (data.type === 'dispatch') {
			data.action.broadcast = false;
			this.store.dispatch(data.action)
		}
	}

}

const instance = new ActionWebsocket();

export default instance;