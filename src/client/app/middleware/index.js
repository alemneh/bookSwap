import { applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import login from './login';
import resetErrors from './resetErrors';

export default applyMiddleware(login, resetErrors, thunk, logger());
