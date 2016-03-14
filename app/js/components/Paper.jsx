import React from 'react'

let Paper = (props) => {
	return (
		<div className="paper paperOuter">
			<div className="paper">
				<div className="paper paperInner">
					{props.children}
				</div>
			</div>
		</div>
	);
}

export default Paper