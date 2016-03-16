import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Paper from '../components/Paper'
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

class LoginView extends React.Component {

	constructor() {
		super()
	}

	componentDidMount() {
		//Load or create a new user
		if (this.props.user && this.props.user.id !== null) {
			this.props.getUser(this.props.user.id)
		} else {
			this.props.createUser()
		}
	}

	componentWillReceiveProps(nextProps) {
		const location = this.props.location

		if (nextProps.authenticated == true) {
			if (location.state && location.state.nextPathname) {
		    	this.context.router.replace(location.state.nextPathname)
		    } else {
		        this.context.router.replace('/')
		    }
		}
	}

	render() {
		return(
			<div className="pageContent">
				<Header/>
					<Paper>
						<LoadingIndicator/>
					</Paper>
				<Footer/>
			</div>
		);
	}
}

LoginView.contextTypes = {
	router: React.PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		loading: state.user.loading || state.user.saving,
		user: state.user.user,
		authenticated: state.user.authenticated,
		todoListId: state.todos.id
	}
}

export default connect((mapStateToProps), {
	createUser,
	getUser
})(LoginView)
