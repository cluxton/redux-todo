import React from 'react'
import classnames from 'classnames'

const TodoItem = (props) => {

	let itemClasses = classnames({
		'todoItem': true,
		'todoItem--complete': props.item.complete === true
	})

	let hint = props.item.complete ? "UNDO" : "COMPLETED";

	return (
		<li className={itemClasses}
			onClick={props.onClick}
			data-todo-id={props.item.id}
			data-is-complete={props.item.complete}>
			<span className="todoLabel">{props.item.title}</span>
			<span className="todoHint">{hint}</span>
		</li>
	)
}

export default TodoItem