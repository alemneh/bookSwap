import { browserHistory } from 'react-router';
import { LOGIN_FULFILLED, LOGOUT } from '../ActionConstants';

export default store => next => action => {

  if( action.type === LOGIN_FULFILLED ) {
    browserHistory.push('/profile');
  } else if( action.type === LOGOUT ) {
    localStorage.removeItem('reduxState');
    browserHistory.push('/');
  }
  next(action);
};
