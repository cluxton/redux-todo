import React from 'react'

const EnterKey = 13

class TodoField extends React.Component {
	
	constructor() {
		super()
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	onSubmit(e) {
		e.preventDefault()
		this.props.addTodo({ title: this.refs.todoName.value, complete: false})
		this.refs.todoName.value = ''
		return false
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} ref="newTodoForm" autoComplete="off">
				<input 
					className="todoInput"
					type="text" 
					placeholder="New item"
					autoComplete="off"
					ref="todoName"></input>
			</form>
		)
	}
		
}

export default TodoField