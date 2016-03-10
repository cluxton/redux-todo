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
			<form onSubmit={this.onSubmit} ref="newTodoForm">
				<input 
					type="text" 
					name="todoTitle"
					ref="todoName"></input>
				<input type="submit" value="Add"/>
			</form>
		)
	}
		
}

export default TodoField