import React from 'react'
import AppBar from 'material-ui/lib/app-bar';

const NavLink = (props) => {
	return <a href={props.href} className="lx-nav-link">{props.children}</a>;
};

const Header = (props) => {
	return (
		<div className="lx-header">
			<AppBar
			    title="Todo List"
			    iconClassNameRight="muidocs-icon-navigation-expand-more"/>
		</div>
	);
};

export default Header
