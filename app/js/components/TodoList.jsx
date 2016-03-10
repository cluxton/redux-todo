import React from 'react'
import TodoItem from './TodoItem'
import CSSTransitionGroup from 'react-addons-css-transition-group'

let TodoList = (props) => {

	let items = props.todos.map((item, i) => {
		return <TodoItem key={item.title} item={item}/>
	})

	return (
		<ul className="todoList">
			<CSSTransitionGroup 
				transitionName="todo-transition"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}>
				{items}
			</CSSTransitionGroup>
		</ul>
	)	
}

export default TodoList