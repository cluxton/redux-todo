import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TodoList from '../components/TodoList'
import TodoField from '../components/TodoField'
import Paper from '../components/Paper'
import UserDisplay from '../components/UserDisplay'

import { connect } from 'react-redux'
import { createUser, getUser } from '../redux/modules/user'
import { 
	addTodo,
	addAsync,
	markComplete,
	undoComplete, 
	clearCompleted 
} from '../redux/modules/todo'


class HomeView extends React.Component {

	constructor() {
		super()
		this.onClickTodo = this.onClickTodo.bind(this)
		this.onClickCompleteTodo = this.onClickCompleteTodo.bind(this)
	}

	componentDidMount() {
		if (this.props.user && this.props.user.id !== null) {
			console.log("Get user")
			this.props.getUser(this.props.user.id)
		} else {
			console.log("Create user")
			this.props.createUser()
		}
	}

	onClickTodo(e) {
		let data = e.currentTarget.dataset;

		if (!JSON.parse(data.isComplete)) {
			this.props.markComplete(data.todoId)
		} else {
			this.props.undoComplete(data.todoId)
		}
	}

	onClickCompleteTodo(e) {
		
	}

	render() {
		return(
			<div className="pageContent">
				<Header/>
					<Paper>
						<UserDisplay user={this.props.user} loading={this.props.loading}/>
						<div className="paperHeader">
							<h3>Todo List</h3>
						</div>
						<div className="paperBody">
							<TodoField addTodo={this.props.addTodo}/>

							<TodoList 
								todos={this.props.todos}
								onClickTodo={this.onClickTodo}
								itemHint="COMPLETE"/>
							
							<TodoList 
								todos={this.props.complete}
								onClickTodo={this.onClickCompleteTodo}
								itemHint="UNDO"/>

							<div className="paperMargin"></div>
						</div>
						<div className="paperFooter">
							<div className="todoListFooter">
								<button className="clearTodos" onClick={this.props.clearCompleted}>Clear completed</button>
							</div>
						</div>
					</Paper>
				
				<Footer/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos.todos,
		complete: state.todos.complete,
		loading: state.user.loading || state.user.saving,
		user: state.user.user
	}
}

export default connect((mapStateToProps), {
	addTodo,
	addAsync,
	markComplete,
	undoComplete,
	clearCompleted,
	createUser,
	getUser
})(HomeView)
