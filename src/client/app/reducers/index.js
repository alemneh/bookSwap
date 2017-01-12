import { combineReducers } from 'redux';

import user from './userReducer';
import login from './loginReducer';
import books from './booksReducer';

export default combineReducers({
  user,
  login,
  books
});
