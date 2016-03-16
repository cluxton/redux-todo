import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Paper from '../components/Paper'
import UserDisplay from '../components/UserDisplay'
import TodoList from '../components/TodoList'
import throttle from 'lodash/throttle'
import { connect } from 'react-redux'
import { 
	addTodo,
	addAsync,
	markComplete,
	undoComplete, 
	clearCompleted,
	loadTodoList,
	createTodoList,
	saveTodoList
} from '../redux/modules/todo'

const SAVE_INTERVAL = 3000;


class HomeView extends React.Component {

	constructor() {
		super()
		this.onClickTodo = this.onClickTodo.bind(this)
		this.saveTodoList = throttle(this.saveTodoList.bind(this), SAVE_INTERVAL)
	}

	componentDidMount() {
		//Load or create a new todoList
		if ('id' in this.props.params) {
			this.props.loadTodoList(this.props.params.id)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.todos.id != null) {
			this.saveTodoList()
		}
	}

	saveTodoList() {
		
		this.props.saveTodoList()
	}

	onClickTodo(e) {
		let data = e.currentTarget.dataset;

		if (!JSON.parse(data.isComplete)) {
			this.props.markComplete(data.todoId)
		} else {
			this.props.undoComplete(data.todoId)
		}
	}

	render() {
		return(
			<div className="pageContent">
				<Header/>
					<Paper>
						<UserDisplay user={this.props.user}/>
						{ this.props.todos.id != null ? 
							<TodoList
								todos={this.props.todos}

								addTodo={this.props.addTodo}
								onClickTodo={this.onClickTodo}
								onClearTodos={this.props.clearCompleted}/>
						: 
						<span>Loading</span> }
						

					</Paper>
				<Footer/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos,
		loading: state.todos.loading,
		user: state.user.user
	}
}

export default connect((mapStateToProps), {
	addTodo,
	addAsync,
	markComplete,
	undoComplete,
	clearCompleted,
	loadTodoList,
	createTodoList,
	saveTodoList
})(HomeView)
