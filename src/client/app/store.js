import { createStore } from 'redux';

import middleware from './middleware';
import reducer from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();

const store = createStore(reducer, persistedState, middleware);

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000));

export default store
