import React from 'react';
import { browserHistory } from 'react-router';
import { SIGN_UP_FULFILLED, LOGOUT } from '../ActionConstants';

export default store => next => action => {

  if( action.type === LOGOUT || action.type === SIGN_UP_FULFILLED ) {
    browserHistory.push('/');
  }

  next(action);
};
