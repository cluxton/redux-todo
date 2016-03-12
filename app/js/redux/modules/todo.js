import merge from 'lodash/merge'
import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'
import withoutIndex from '../../util/ArrayUtil'

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

		return {
			counter: state.counter + 1,
			remaining: state.remaining.concat(todo),
			complete: state.complete
		}
	},

	[MARK_AS_COMPLETE]: (state, action) => {
		let id = action.payload
		let index = findIndex(state.remaining, (todo) => todo.id === id)
		let completeTodo = merge({}, state.remaining[index], { complete: true })

		return {
			counter: state.counter,
			remaining: withoutIndex(state.remaining, index),
			complete: state.complete.concat(completeTodo)
		}
	},

	[UNDO_COMPLETE]: (state, action) => {
		let id = action.payload
		let index = findIndex(state.complete, (todo) => todo.id === id)
		let incompleteTodo = merge({}, state.complete[index], { complete: false })

		return {
			counter: state.counter,
			remaining: state.remaining.concat(incompleteTodo),
			complete: withoutIndex(state.complete, index)
		}
	},

	[CLEAR_COMPLETED]: (state, action) => {
		return {
			counter: state.counter,
			remaining: state.remaining,
			complete: []
		}
	}
		
}

//Setup
const initialState = {
	counter: 2,
	remaining: [
		{ title: 'Item 1', complete: false, id: 0 }
	],
	complete: [
		{ title: 'Something finished', complete: true, id: 1 }
	]
}

//Reducer
export default function todoReducer (state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}

