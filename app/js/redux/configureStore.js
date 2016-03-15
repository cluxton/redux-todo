import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import todos from './modules/todo'
import user from './modules/user'
import stateSavingMiddleware from './middleware/stateSavingMiddleware'
import wsBroadcaseMiddleware from './middleware/wsBroadcaseMiddleware'

const reducers = combineReducers({ todos, user })

export default function configureStore (initialState = {}) {
	let middleware = applyMiddleware(
		stateSavingMiddleware('appState', 500),
		wsBroadcaseMiddleware,
		thunk
	)

	const store = middleware(createStore)(reducers, initialState)

	return store
}