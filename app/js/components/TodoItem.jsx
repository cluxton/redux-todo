import React from 'react'

const TodoItem = (props) => {
	return (
		<div className="todoItem">
			{props.item.title}
		</div>
	)
}

export default TodoItem