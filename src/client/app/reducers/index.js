import { combineReducers } from 'redux';

import user from './userReducer';
import login from './loginReducer';
import books from './booksReducer';
import alert from './alertReducer';

export default combineReducers({
  user,
  login,
  books,
  alert
});
