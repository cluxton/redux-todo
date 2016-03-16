import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Paper from '../components/Paper'
import UserDisplay from '../components/UserDisplay'

import { connect } from 'react-redux'
import { createUser, getUser } from '../redux/modules/user'
import { 
	addTodo,
	addAsync,
	markComplete,
	undoComplete, 
	clearCompleted,
	loadTodoList,
	createTodoList
} from '../redux/modules/todo'

class IndexView extends React.Component {

	constructor() {
		super()
		this.onClickTodo = this.onClickTodo.bind(this)
	}

	componentDidMount() {
		//Load or create a new user
		if (this.props.user && this.props.user.id !== null) {
			console.log("Get user")
			this.props.getUser(this.props.user.id)
		} else {
			console.log("Create user")
			this.props.createUser()
		}

		//Load or create a new todoList
		if ('id' in this.props.params) {
			this.props.loadTodoList(this.props.params.id)
		} else if (this.props.todoListId != null) {
			this.props.loadTodoList(this.props.todoListId)
		} else {
			this.props.createTodoList()
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

	render() {
		return(
			<div className="pageContent">
				<Header/>
					<Paper>
						Index
					</Paper>
				<Footer/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.user.loading || state.user.saving || state.todos.loading,
		user: state.user.user,
		todoListId: state.todos.id
	}
}

export default connect((mapStateToProps), {
	createUser,
	getUser,
	loadTodoList,
	createTodoList
})(IndexView)
