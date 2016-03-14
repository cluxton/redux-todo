import findIndex from 'lodash/findIndex'
import withoutIndex from '../../util/ArrayUtil'
import Actions from '../actions'
import u from 'updeep'

//Action creators
export const addTodo = (todo) => ({
	type: Actions.ADD_TODO,
	payload: todo
})

export const markComplete = (todoId) => ({
	type: Actions.MARK_AS_COMPLETE,
	payload: parseInt(todoId)
})

export const undoComplete = (todoId) => ({
	type: Actions.UNDO_COMPLETE,
	payload: parseInt(todoId)
})

export const clearCompleted = () => ({
	type: Actions.CLEAR_COMPLETED,
	payload: null
})


export const addAsync = (todo) => {
	return (dispatch) => {
		setTimeout(()=>{
			dispatch(addTodo(todo))
		}, 500)
	}
}

export const actions = {
	addTodo
}

//Actions
const ACTION_HANDLERS = {

	[Actions.ADD_TODO]: (state, action) => {
		let todo = u({ id: state.counter }, action.payload)

		return u({
			counter: state.counter + 1,
			remaining: state.remaining.concat(todo),
		}, state)
	},

	[Actions.MARK_AS_COMPLETE]: (state, action) => {
		let id = action.payload
		let index = findIndex(state.remaining, (todo) => todo.id === id)
		let completeTodo = u({ complete: true }, state.remaining[index])

		return u({
			remaining: withoutIndex(state.remaining, index),
			complete: state.complete.concat(completeTodo)
		}, state)
	},

	[Actions.UNDO_COMPLETE]: (state, action) => {
		let id = action.payload
		let index = findIndex(state.complete, (todo) => todo.id === id)
		let incompleteTodo =  u({ complete: false }, state.complete[index])

		return u({
			remaining: state.remaining.concat(incompleteTodo),
			complete: withoutIndex(state.complete, index)
		}, state)
	},

	[Actions.CLEAR_COMPLETED]: (state, action) => {
		return u({
			complete: []
		}, state)
	}
}

//Setup
const initialState = {
	counter: 4,
	remaining: [
		{ title: 'Do something', complete: false, id: 0 },
		{ title: 'Do something else', complete: false, id: 1 }
	],
	complete: [
		{ title: 'Open todo app', complete: true, id: 2 },
		{ title: 'Create a todo', complete: true, id: 3 }
	]
}

//Reducer
export default function todoReducer (state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}

