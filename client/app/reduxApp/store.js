/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
// import { autoRehydrate } from 'redux-persist'
import Immutable from 'seamless-immutable';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from '../reduxApp';
import RootSaga from '../sagas';
import { makeSelectLocationState } from '../containers/App/selectors';

const browserHistory = createHistory();

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ collapsed: true });
const initialState = {};

// Create the store with three middlewares
// 1. sagaMiddleware: Makes redux-sagas work
// 2. routerMiddleware: Syncs the location/URL path to the state
// 3. Redux-logger, log each action to console

/* const devToolsExtension = window.devToolsExtension // eslint-disable-line no-undef
  ? window.devToolsExtension() // eslint-disable-line no-undef
  : (f: any): any => f // eslint-disable-line arrow-parens */

const middlewares = [
  sagaMiddleware,
  routerMiddleware(browserHistory),
  logger,
];

const enhancers = [
  applyMiddleware(...middlewares),
];

// add the autoRehydrate enhancer
  // if (ReduxPersist.active) {
  //   enhancers.push(autoRehydrate())
  // }

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  ['production', 'staging'].includes(process.env.NODE_ENV) &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const store = createStore(
  createReducer(),
  composeEnhancers(...enhancers)
);


// Extensions
store.runSaga = sagaMiddleware.run;
store.injectedReducers = {}; // Reducer registry
store.injectedSagas = {}; // Saga registry

// kick off root saga
let sagasManager = sagaMiddleware.run(RootSaga)

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(createReducer(store.injectedReducers));

    sagasManager.cancel()
    sagasManager.done.then(() => {
      sagasManager = sagaMiddleware.run(RootSaga)
    })
  })
}

export const history = browserHistory;

export const { dispatch, getState } = store;
export default store;
