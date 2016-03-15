import findIndex from 'lodash/findIndex'
import withoutIndex from '../../util/ArrayUtil'
import Actions from '../actions'
import u from 'updeep'

//Action creators
export const createUser = () => {
	return (dispatch, getState) => {
		dispatch({
			type: Actions.CREATE_USER,
			payload: null
		})

		fetch('/api/users', {method: 'POST'})
			.then(response => response.json())
			.then(json => {
				dispatch({
					type: Actions.CREATE_USER_SUCCESS,
					user: json
				})
			})
			.catch(err => {
				dispatch({
					type: Actions.CREATE_USER_ERROR,
					error: err
				})
			})
	}
}

export const getUser = (userId) => {
	return (dispatch, getState) => {
		dispatch({
			type: Actions.LOAD_USER,
			payload: null
		})

		fetch('/api/users/' + userId)
			.then(response => response.json())
			.then(json => {
				dispatch({
					type: Actions.LOAD_USER_SUCCESS,
					user: json
				})
			})
			.catch(err => {
				dispatch({
					type: Actions.LOAD_USER_ERROR,
					error: err
				})
			})
	}
}

export const actions = {
	createUser
}

//Actions
const ACTION_HANDLERS = {

	[Actions.CREATE_USER]: (state, action) => {
		return u({
			saving: true
		}, state)
	},

	[Actions.CREATE_USER_SUCCESS]: (state, action) => {
		console.log("CREATE SUCCESS", action)
		return u({
			saving: false,
			user: u.constant(action.user)
		}, state)
	},

	[Actions.LOAD_USER_SUCCESS]: (state, action) => {
		console.log("LOAD_USER SUCCESS", action)
		return u({
			loading: false,
			user: u.constant(action.user)
		}, state)
	},

	[Actions.CREATE_USER_ERROR]: (state, action) => {
		return u({
			saving: false,
			error: action.error,
			user : { name: "Offline user", id: null }
		}, state)
	},

	[Actions.LOAD_USER]: (state, action) => {
		return u({
			loading: true
		}, state)
	},

	[Actions.LOAD_USER_ERROR]: (state, action) => {
		console.log("ERROR:", action)
		return u({
			loading: false,
			error: action.error,
			user : { name: "Offline user", id: null }
		}, state)
	}
}

//Setup
const initialState = {
	user: { name: "Offline user", id: null },
	error: null,
	loading: false,
	saving: false
}

//Reducer
export default function todoReducer (state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}

