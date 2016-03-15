import findIndex from 'lodash/findIndex'
import withoutIndex from '../../util/ArrayUtil'
import Actions from '../actions'
import u from 'updeep'

//Action creators
export const addTodo = (todo) => ({
	type: Actions.ADD_TODO,
	payload: todo,
	broadcast: true
})

export const markComplete = (todoId) => ({
	type: Actions.MARK_AS_COMPLETE,
	payload: parseInt(todoId),
	broadcast: true
})

export const undoComplete = (todoId) => ({
	type: Actions.UNDO_COMPLETE,
	payload: parseInt(todoId),
	broadcast: true
})

export const clearCompleted = () => ({
	type: Actions.CLEAR_COMPLETED,
	payload: null,
	broadcast: true
})


export const addAsync = (todo) => {
	return (dispatch) => {
		let action = addTodo(todo);

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
		return u({
			todos: state.todos.concat(action.payload),
		}, state)
	},

	[Actions.MARK_AS_COMPLETE]: (state, action) => {
		let id = action.payload
		let isTodo = todo => todo.id == id

		return u({
			todos: u.map((todo) => u.if(isTodo, {complete: true}, todo)),
		}, state)
	},

	[Actions.UNDO_COMPLETE]: (state, action) => {
		let id = action.payload
		let isTodo = todo => todo.id == id
		return u({
			todos: u.map((todo) => u.if(isTodo, {complete: false}, todo)),
		}, state)
	},

	[Actions.CLEAR_COMPLETED]: (state, action) => {
		return u({
			todos: u.reject(todo=> todo.complete)
		}, state)
	},

	[Actions.GET_USER_SUCCESS]: (state, action) => {

	}
}

//Setup
const initialState = {
	title: "Offline todo list",
	id: null,
	todos: [
		{ title: 'Do something', complete: false, id: 0 },
		{ title: 'Do something else', complete: false, id: 1 },
		{ title: 'Something to be done', complete: true, id: 2 },
		{ title: 'Something already done', complete: true, id: 3 }
	],
	complete: [ ]
}

//Reducer
export default function todoReducer (state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}

