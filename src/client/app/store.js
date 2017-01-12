import { applyMiddleware, createStore } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = applyMiddleware(thunk, logger());

const persistedState = localStorage.getItem('reduxState') ?
                      JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store
