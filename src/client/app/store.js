import { createStore } from 'redux';

import middleware from './middleware';
import reducer from './reducers';

const persistedState = localStorage.getItem('reduxState') ?
                      JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
  console.log(store.getState());
});

export default store
