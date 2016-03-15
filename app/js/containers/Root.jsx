import React from 'react'
import { Provider } from 'react-redux'


class Root extends React.Component {
	render() {
		return(
			<Provider store={this.props.store}>
				{this.props.children}
			</Provider>
		);
	}
}

export default Root