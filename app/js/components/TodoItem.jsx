import React from 'react'
import classnames from 'classnames'

const TodoItem = (props) => {

	let itemClasses = classnames({
		'todoItem': true,
		'todoItem--complete': props.item.complete === true
	})

	return (
		<li className={itemClasses} onClick={props.onClick} data-todo-id={props.item.id}>
			<span className="todoLabel">{props.item.title}</span>
			<span className="todoHint">{props.actionHint}</span>
		</li>
	)
}

export default TodoItem