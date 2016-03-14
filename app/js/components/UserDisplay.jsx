import React from 'react'

const UserDisplay = (props) => {
	if (props.user === undefined) {
		return null;
	}

	let letter = props.user.name.length < 1 || props.loading ? "?" : props.user.name[0] ;
	let name = props.loading ? "Loading..." : props.user.name

	return (
		<div className="userDisplay">
			<div className="userIcon">{letter}</div>
			<span>{name}</span>
		</div>
	)	
}

export default UserDisplay