import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import todos from './modules/todo'
import stateSavingMiddleware from '../util/stateSavingMiddleware'

const reducers = combineReducers({ todos })

export default function configureStore (initialState = {}) {
	let middleware = applyMiddleware(
		stateSavingMiddleware('appState'), 
		thunk
	)

	const store = middleware(createStore)(reducers, initialState)

	return store
}