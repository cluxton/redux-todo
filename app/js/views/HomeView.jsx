import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import { addTodo, addAsync } from '../redux/modules/todo'

class HomeView extends React.Component {

	constructor() {
		super()

		this.addTodo = this.addTodo.bind(this)
	}

	get todos() {
		return this.props.todos.map(function(todo, i) {
			console.log(todo)
			return <li key={i}>{todo}</li>
		});
	}

	addTodo() {
		console.log(this)
		this.props.addAsync(this.refs.todoName.value)
		this.refs.todoName.value = ''
	}

	render() {
		return(
				<div className="lx-page">
					<Header/>
					<div className="lx-main lx-content lx-pad">
						<input type="text" ref="todoName"></input><button onClick={this.addTodo}>Add</button>
						<div>
							TODOS:
							<ul>
								{this.todos}
							</ul>
						</div>
					</div>
					
					<Footer/>
				</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log("MAPSTATE")
	console.log(state)

	return {
		todos: state.todos
	}
}

export default connect((mapStateToProps), {
	addTodo: addTodo,
	addAsync: addAsync
})(HomeView)
