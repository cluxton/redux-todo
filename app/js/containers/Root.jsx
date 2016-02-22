import React from 'react'
import { Provider } from 'react-redux'
import HomeView from '../views/HomeView'

class Root extends React.Component {
	render() {
		return(
			<Provider store={this.props.store}>
				<HomeView/>
			</Provider>
		);
	}
}

export default Root