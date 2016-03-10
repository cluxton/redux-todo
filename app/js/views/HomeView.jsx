import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TodoList from '../components/TodoList'
import TodoField from '../components/TodoField'
import { connect } from 'react-redux'
import { addTodo, addAsync } from '../redux/modules/todo'

class HomeView extends React.Component {

	constructor() {
		super()
	}

	render() {
		return(
				<div className="lx-page">
					<Header/>
					<div className="lx-main lx-content lx-pad">
						<TodoList todos={this.props.todos}/>
						<TodoField addTodo={this.props.addAsync}/>
					</div>
					
					<Footer/>
				</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos
	}
}

export default connect((mapStateToProps), {
	addTodo: addTodo,
	addAsync: addAsync
})(HomeView)
