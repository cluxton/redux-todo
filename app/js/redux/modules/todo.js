import merge from 'lodash/merge'
import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'
import withoutIndex from '../../util/ArrayUtil'
import u from 'updeep'

//Constants
export const ADD_TODO = 'ADD_TODO'
export const MARK_AS_COMPLETE = 'MARK_AS_COMPLETE'
export const UNDO_COMPLETE = 'UNDO_COMPLETE'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'




//Action creators
export const addTodo = (todo) => ({
	type: ADD_TODO,
	payload: todo
})

export const markComplete = (todoId) => ({
	type: MARK_AS_COMPLETE,
	payload: parseInt(todoId)
})

export const undoComplete = (todoId) => ({
	type: UNDO_COMPLETE,
	payload: parseInt(todoId)
})

export const clearCompleted = () => ({
	type: CLEAR_COMPLETED,
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

	[ADD_TODO]: (state, action) => {
		let todo = action.payload
		todo.id = state.counter

		return u({
			counter: state.counter + 1,
			remaining: state.remaining.concat(todo),
		}, state)
	},

	[MARK_AS_COMPLETE]: (state, action) => {
		let id = action.payload
		let index = findIndex(state.remaining, (todo) => todo.id === id)
		let completeTodo = merge({}, state.remaining[index], { complete: true })

		return u({
			remaining: withoutIndex(state.remaining, index),
			complete: state.complete.concat(completeTodo)
		}, state)
	},

	[UNDO_COMPLETE]: (state, action) => {
		let id = action.payload
		let index = findIndex(state.complete, (todo) => todo.id === id)
		let incompleteTodo = merge({}, state.complete[index], { complete: false })

		return u({
			remaining: state.remaining.concat(incompleteTodo),
			complete: withoutIndex(state.complete, index)
		}, state)
	},

	[CLEAR_COMPLETED]: (state, action) => {
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

