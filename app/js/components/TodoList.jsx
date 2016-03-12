import React from 'react'
import TodoItem from './TodoItem'
import CSSTransitionGroup from 'react-addons-css-transition-group'

let TodoList = (props) => {

	let items = props.todos.map((item, i) => {
		return <TodoItem 
					key={item.id} 
					item={item} 
					onClick={props.onClickTodo} 
					actionHint={props.itemHint}/>
	})

	return (
		<ul className="todoList">
			<CSSTransitionGroup 
				transitionName="todo-transition"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}>
				{items}
			</CSSTransitionGroup>
		</ul>
	)	
}

export default TodoList