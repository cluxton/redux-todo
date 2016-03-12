import debounce from 'lodash/debounce'

const stateSavingMiddleware = (stateKey) => {
	
	let saveState = debounce((getState)=> {
		if ('localStorage' in window) {
			window.localStorage.setItem(stateKey, JSON.stringify(getState()))
		}
	}, 2000)

	let middleware = ({dispatch, getState}) => {
		return next => action => {
			saveState(getState)
			next(action);
		}
	}

	return middleware
}

export default stateSavingMiddleware
