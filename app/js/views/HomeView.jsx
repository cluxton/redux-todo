import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TodoList from '../components/TodoList'
import TodoField from '../components/TodoField'
import Paper from '../components/Paper'

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
		this.props.createUser()
	}

	onClickTodo(e) {
		this.props.markComplete(e.currentTarget.dataset.todoId)
	}

	onClickCompleteTodo(e) {
		this.props.undoComplete(e.currentTarget.dataset.todoId)
	}

	render() {
		return(
				<div className="pageContent">
					<Header/>
						<Paper>
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
								{ this.props.complete.length > 0 ?
									<div className="todoListFooter">
										<button className="clearTodos" onClick={this.props.clearCompleted}>Clear completed</button>
									</div>
								: null}
							</div>
						</Paper>
					
					<Footer/>
				</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos.remaining,
		complete: state.todos.complete,
		loading: state.user.loading || state.user.saving
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
