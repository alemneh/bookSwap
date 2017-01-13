import { applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import login from './login';

export default applyMiddleware(login, thunk, logger());
