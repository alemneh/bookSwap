import React from 'react';
import * as types from '../ActionConstants';

const initialState = {
  token: null,
  userId: null,
  fetching: false,
  fetched: false,
  error: null,
  success: null,
  slideToggleClass: ''
}

export default function(state=initialState, action) {
  switch(action.type) {
    case types.LOGIN: {
      return {...state, fetching: true}
    }
    case types.LOGIN_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.LOGIN_FULFILLED: {
      const { token, userId} = action.payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        token,
        userId
      }
    }
    case types.SIGN_UP: {
      return {...state, fetching: true}
    }
    case types.SIGN_UP_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.SIGN_UP_FULFILLED: {
      return {...state, fetching: false, fetched: true}
    }
    case types.LOGOUT: {
      return initialState;
    }
    case types.TOGGLE_NAVBAR: {
      return {...state, slideToggleClass: state.slideToggleClass ? '' : 'none' }
    }
  }
  return state;
}
