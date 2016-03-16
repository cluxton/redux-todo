import React from 'react'
import TodoItems from '../components/TodoItems'
import TodoField from '../components/TodoField'
import ActionWebsocket from '../util/ActionWebsocket'
import find from 'lodash/find'

class TodoList extends React.Component {
	
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
		let hasCompleted = typeof(find(this.props.todos.todos, function(t) { return t.complete == true })) !== 'undefined';
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
						{ hasCompleted === true ?
						<button className="clearTodos" onClick={this.props.onClearTodos}>Clear completed</button>
						: null }
					</div>
				</div>
			</div>
		)
	}
		
}

TodoList.propTypes = {
	todos: React.PropTypes.object,
	addTodo: React.PropTypes.func,
	onClickTodo: React.PropTypes.func
}

export default TodoList