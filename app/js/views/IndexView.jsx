import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Paper from '../components/Paper'
import UserDisplay from '../components/UserDisplay'
import LoadingIndicator from '../components/LoadingIndicator'

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
	}

	componentDidMount() {
		this.props.createTodoList()
	}

	componentWillReceiveProps(nextProps) {
		const location = this.props.location
		console.log(nextProps);
		if (nextProps.todoListId !== null) {
			console.log("ROUTE")
		    this.context.router.replace(`/todos/${nextProps.todoListId}`)
		}
	}

	render() {
		return(
			<div className="pageContent">
				<Header/>
					<Paper>
						<UserDisplay user={this.props.user}/>
						<LoadingIndicator/>
					</Paper>
				<Footer/>
			</div>
		);
	}
}

IndexView.contextTypes = {
	router: React.PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		loading: state.user.loading || state.user.saving || state.todos.loading,
		user: state.user.user,
		todoListId: state.todos.id
	}
}

export default connect((mapStateToProps), {
	loadTodoList,
	createTodoList
})(IndexView)
