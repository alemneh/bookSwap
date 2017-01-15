import React from 'react';
import * as types from '../ActionConstants';

const initialState = {
  token: null,
  user: null,
  fetching: false,
  fetched: false,
  error: null
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
      const { token, user} = action.payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        token,
        user
      }
    }
    case types.LOGOUT:{
      return initialState
    }
  }
  return state;
}
