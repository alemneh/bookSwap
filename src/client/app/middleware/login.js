import React from 'react';
import { browserHistory } from 'react-router';
import { LOGIN_FULFILLED, LOGOUT } from '../ActionConstants';

export default store => next => action => {

  if( action.type === LOGOUT ) {
    browserHistory.push('/');
  }

  next(action);
};
