import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './redux/configureStore'

import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router'
import Root from './containers/Root'
import IndexView from './views/IndexView'
import LoginView from './views/LoginView'
import HomeView from './views/HomeView'

const createRouter = (store) => {

	const App = (props)=> {
		return <Root store={store}>{props.children}</Root>
	}

	const requireAuth = (nextState, replace) => {
		let authenticated = store.getState().user.authenticated;

		if (!authenticated) {
			replace({
				pathname: '/login',
				state: { nextPathname: nextState.location.pathname }
			})
		}
	}

	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={IndexView} onEnter={requireAuth}/>
				<Route path="/login" component={LoginView}/>
				<Route path="/todos/:id" component={HomeView} onEnter={requireAuth}/>
			</Route>
		</Router>
	)
}

export default createRouter