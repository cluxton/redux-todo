import debounce from 'lodash/debounce'

const stateSavingMiddleware = (stateKey, debounceInterval) => {
	
	let saveState = debounce((getState)=> {
		if ('localStorage' in window) {
			window.localStorage.setItem(stateKey, JSON.stringify(getState()))
		}
	}, debounceInterval, { 'maxWait' : 1000 })

	let middleware = ({dispatch, getState}) => {
		return next => action => {
			saveState(getState)
			next(action);
		}
	}

	return middleware
}

export default stateSavingMiddleware
