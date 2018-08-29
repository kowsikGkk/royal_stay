/* eslint-disable */
import 'babel-polyfill';
import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotLoaderAppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter } from 'react-router-dom';
import './global.css';
import App from './Routes/App';
import configureStore from './store/configureStore';
const history = createBrowserHistory();
export const store = configureStore({}, history);

const renderApp = () => {
	ReactDOM.render(
		<HotLoaderAppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ConnectedRouter>
			</Provider>
		</HotLoaderAppContainer>,
		document.getElementById('root')
	);
};
renderApp();
if (module.hot) {
	module.hot.accept();
}
