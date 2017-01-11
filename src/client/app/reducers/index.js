import { combineReducers } from 'redux';

import user from './userReducer';
import login from './loginReducer';

export default combineReducers({
  user,
  login
});
