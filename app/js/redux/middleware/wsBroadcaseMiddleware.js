import ActionWebsocket from '../../util/ActionWebsocket'

const wsBroadcaseMiddleware = ({dispatch, getState}) => {
	return next => action => {
		
		if (action.broadcast === true) {
			ActionWebsocket.sendMessage({
				type: 'dispatch',
				action: action
			})
		}
		
		
		next(action);
	}
}

export default wsBroadcaseMiddleware
