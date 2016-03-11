import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TodoList from '../components/TodoList'
import TodoField from '../components/TodoField'
import { connect } from 'react-redux'
import { addTodo, addAsync, markComplete, undoComplete } from '../redux/modules/todo'

class HomeView extends React.Component {

	constructor() {
		super()
		this.onClickTodo = this.onClickTodo.bind(this)
		this.onClickCompleteTodo = this.onClickCompleteTodo.bind(this)
	}

	onClickTodo(e) {
		this.props.markComplete(e.currentTarget.dataset.todoId)
	}

	onClickCompleteTodo(e) {
		this.props.undoComplete(e.currentTarget.dataset.todoId)
	}

	render() {
		return(
				<div className="lx-page">
					<Header/>
					<div className="lx-main lx-content lx-pad">
						<TodoField addTodo={this.props.addAsync}/>
						<h4>Remaining</h4>
						
						{this.props.todos.length < 1 ?
							<span>{"0 items remaining"}</span>
						: null}
						<TodoList 
							todos={this.props.todos}
							onClickTodo={this.onClickTodo}
							itemHint="COMPLETE"/>
						
						
						{ this.props.complete.length > 0 ?
							<h4>Completed</h4>
						: null}

						<TodoList 
							todos={this.props.complete}
							onClickTodo={this.onClickCompleteTodo}
							itemHint="UNDO"/>
						
					</div>
					
					<Footer/>
				</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos.remaining,
		complete: state.todos.complete
	}
}

export default connect((mapStateToProps), {
	addTodo: addTodo,
	addAsync: addAsync,
	markComplete: markComplete,
	undoComplete: undoComplete
})(HomeView)
