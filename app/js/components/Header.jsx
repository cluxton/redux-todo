import React from 'react'

const NavLink = (props) => {
	return <a href={props.href} className="lx-nav-link">{props.children}</a>;
};

const Header = (props) => {
	return (
		<div className="lx-header">
			<div className="lx-content lx-relative">
				<span className="lx-title">Redux todo</span>
				<div className="lx-nav lx-nav-collapse">
					<NavLink href="#">Github</NavLink>
					<NavLink href="#">NPM</NavLink>
					<NavLink href="#">License</NavLink>
					<NavLink href="#">Download</NavLink>
				</div>
				<span className="lx-nav-menu lx-hide-gt-small">Menu</span>
			</div>
		</div>
	);
};

export default Header
