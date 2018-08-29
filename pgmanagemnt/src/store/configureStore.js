import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState, history) {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(reduxImmutableStateInvariant());
  }

  // add support for Redux dev tools if not production build and devtools available
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // shouldHotReload: false
        deserializeState: state =>
          Object.keys(state).reduce((previous, current) => {
            previous[current] = fromJS(state[current]);
            return previous;
          }, {}),
      })
      : compose;

  const store = createStore(
    rootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  // sagaMiddleware.run(clientDetailsSagas);

  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};
  return store;
}

export default configureStore;
