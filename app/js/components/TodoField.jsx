import React from 'react'

const EnterKey = 13

class TodoField extends React.Component {

	constructor() {
		super()
		this.onSubmit = this.onSubmit.bind(this)
		this.handleTextChange = this.handleTextChange.bind(this)
		
		this.state = { text: "" }
	}

	handleTextChange(e) {
		this.setState({ text: e.target.value })
	}

	componentDidMount() {
		if (this.todoName !== null) {
			this.todoName.focus()
		}
	}

	onSubmit(e) {
		e.preventDefault()
		this.props.addTodo({ title: this.state.text, complete: false})
		this.setState({"text" : ""})
		return false
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} autoComplete="off">
				<input 
					className="todoInput"
					type="text" 
					placeholder="New item"
					autoComplete="off"
					value={this.state.text}
					onChange={this.handleTextChange}
					ref={(ref)=> this.todoName = ref}
					></input>
			</form>
		)
	}
		
}

export default TodoField