import React from 'react'

const NavLink = (props) => {
	return <a href={props.href} className="lx-nav-link">{props.children}</a>;
};

const Header = (props) => {
	return (
		<div className="lx-header">
			<div className="lx-content lx-relative">
				<span className="lx-title">Todo List</span>
				<div className="lx-nav">
					<NavLink href="#">Github</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Header
