import React from 'react'

const NavLink = (props) => {
	return <a href={props.href} className="lx-nav-link">{props.children}</a>;
};

const Header = (props) => {
	return (
		<div className="td-header">
			{/*Header*/}
		</div>
	);
};

export default Header
