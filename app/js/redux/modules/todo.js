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

//Action creators
export const createTodoList = () => {
	return (dispatch, getState) => {
		dispatch({
			type: Actions.CREATE_TODO_LIST,
			payload: null
		})

		fetch('/api/todolist', {method: 'POST'})
			.then(response => response.json())
			.then(json => {
				dispatch({
					type: Actions.TODO_LIST_RECEIVED,
					todoList: json
				})
			})
			.catch(err => {
				dispatch({
					type: Actions.CREATE_TODO_LIST_ERROR,
					error: err
				})
			})
	}
}

export const loadTodoList = (id) => {
	return (dispatch, getState) => {
		dispatch({
			type: Actions.LOAD_TODO_LIST,
			payload: null
		})

		fetch(`/api/todolist/${id}`)
		.then(response => response.json())
		.then(json => {
			dispatch({
				type: Actions.TODO_LIST_RECEIVED,
				todoList: json
			})
		})
		.catch(err => {
			dispatch({
				type: Actions.LOAD_TODO_LIST_ERROR,
				error: err
			})
		})
	}
}

export const saveTodoList = () => {
	return (dispatch, getState) => {
		let todos = getState().todos
		let updates = JSON.stringify({
			title: todos.title,
			todos: todos.todos
		})

		fetch(`/api/todolist/${todos.id}`, {
			method: 'PUT',
			headers: {
		    	"Content-type": "application/json; charset=UTF-8"
		    },
			body: updates
		})
		.then(response => response.json())
		.then(json => {
			console.log("Save successful")
		})
		.catch(err => {
			console.log("Save failed")
		})
	}
}


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

	[Actions.CREATE_TODO_LIST]: (state, action) => {
		return u({
			loading: true
		}, state)
	},

	[Actions.CREATE_TODO_LIST_ERROR]: (state, action) => {
		return u({
			loading: false
		}, state)
	},

	[Actions.LOAD_TODO_LIST]: (state, action) => {
		return u({
			loading: true
		}, state)
	},

	[Actions.LOAD_TODO_LIST_ERROR]: (state, action) => {
		return u({
			loading: false
		}, state)
	},


	[Actions.TODO_LIST_RECEIVED]: (state, action) => {
		return u({
			id: action.todoList.id,
			title: action.todoList.title,
			todos: u.constant(action.todoList.todos),
			loading: false
		}, state)
	},

	// [Actions.LOAD_SAVED_STATE]: (state, action) => {
	// 	let savedState = action.state;
	// 	console.log(savedState)
	// 	return u({
	// 		todos: savedState.todos.todos
	// 	}, state)
	// }	
}

//Setup
const initialState = {
	title: "",
	id: null,
	loading: true,
	todos: [ ]
}

//Reducer
export default function todoReducer (state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}

