//Constants
export const ADD_TODO = 'ADD_TODO'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR'

//Action creators
export const addTodo = (todo) => ({
	type: ADD_TODO,
	payload: todo
})

export const addAsync = (todo) => {
	return (dispatch) => {
		setTimeout(()=>{
			dispatch(addTodo(todo))
		}, 2000)
	}
}

export const actions = {
	addTodo
}

//Actions
const ACTION_HANDLERS = {

	[ADD_TODO]: (state, action) => {
		return state.concat(action.payload);
	}
		
}

//reducer
const initialState = [ 'Item 1' ]

export default function todoReducer (state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]

	return handler ? handler(state, action) : state
}

