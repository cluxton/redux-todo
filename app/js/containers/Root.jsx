import React from 'react'
import { Provider } from 'react-redux'
import HomeView from '../views/HomeView'

import {deepOrange500} from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Root extends React.Component {
	render() {
		return(
			<MuiThemeProvider muiTheme={muiTheme}>
				<Provider store={this.props.store}>
					<HomeView/>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default Root