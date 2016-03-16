import React from 'react'
import TodoItems from '../components/TodoItems'
import TodoField from '../components/TodoField'
import UserDisplay from '../components/UserDisplay'
import ActionWebsocket from '../util/ActionWebsocket'

class TodoView extends React.Component {
	
	constructor() {
		super()
	}

	componentDidMount() {
		ActionWebsocket.connect(`/actions?userId=123&listId=${this.props.todos.id}`);
	}

	componentWillUnmount() {
		ActionWebsocket.disconnect();
	}

	render() {
		return (
			<div>
				<div className="paperHeader">
					<h3>{this.props.todos.title}</h3>
				</div>

				<div className="paperBody">
					<TodoField addTodo={this.props.addTodo}/>

					<TodoItems 
						todos={this.props.todos.todos}
						onClickTodo={this.props.onClickTodo}
						itemHint="COMPLETE"/>

					<div className="paperMargin"></div>
				</div>

				<div className="paperFooter">
					<div className="todoListFooter">
						<button className="clearTodos" onClick={this.props.onClearTodos}>Clear completed</button>
					</div>
				</div>
			</div>
		)
	}
		
}

TodoView.propTypes = {
	todos: React.PropTypes.object,
	addTodo: React.PropTypes.func,
	onClickTodo: React.PropTypes.func
}

export default TodoView