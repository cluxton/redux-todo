import React from 'react'
import TodoItem from './TodoItem'
import CSSTransitionGroup from 'react-addons-css-transition-group'

let TodoItems = (props) => {

	let items = props.todos.map((item, i) => {
		return <TodoItem 
					key={item.id} 
					item={item} 
					onClick={props.onClickTodo} 
					actionHint={props.itemHint}/>
	})


// <CSSTransitionGroup 
// 				transitionName="todo-transition"
// 				transitionEnterTimeout={500}
// 				transitionLeaveTimeout={500}>
				
// 			</CSSTransitionGroup>

	return (
		<ul className="todoList">
			{items}
		</ul>
	)	
}

export default TodoItems