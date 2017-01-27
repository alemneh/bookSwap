import React from 'react';
import { expect } from 'chai';

import * as types from '../src/client/app/ActionConstants';
import reducer from '../src/client/app/reducers/loginReducer';

let initialState, expectedState;

describe('loginReducer', () => {
  beforeEach(() => {
    initialState = {
      token: null,
      user: null,
      success: null,
      fetching: false,
      fetched: false,
      slideToggleClass: '',
      error: null
    };

    expectedState = {
      token: null,
      user: null,
      success: null,
      fetching: false,
      slideToggleClass: '',
      fetched: false,
      error: null
    };

  });

  it('should handle LOGIN', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.LOGIN
    })).to.deep.equal(expectedState);
  });

  it('should handle LOGIN_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {message: 'Error'};

    expect(reducer(initialState, {
      type: types.LOGIN_REJECTED,
      payload: { message: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle LOGIN_FULFILLED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.user = {name: 'Alem'};
    expectedState.token = '123abc';

    expect(reducer(initialState, {
      type: types.LOGIN_FULFILLED,
      payload: {token: '123abc', user: {name: 'Alem'}}
    })).to.deep.equal(expectedState);
  });

  it('should handle SIGN_UP', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.SIGN_UP
    })).to.deep.equal(expectedState);
  });

  it('should handle SIGN_UP_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {message: 'Error'};

    expect(reducer(initialState, {
      type: types.SIGN_UP_REJECTED,
      payload: { message: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle SIGN_UP_FULFILLED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.fetched = true;
    expect(reducer(initialState, {
      type: types.SIGN_UP_FULFILLED
    })).to.deep.equal(expectedState);
  });

  it('should handle LOGOUT', () => {
    expect(reducer(initialState, {
      type: types.LOGOUT
    })).to.deep.equal(expectedState);
  });

  it('should handle TOGGLE_NAVBAR', () => {
    expectedState.slideToggleClass = 'none';

    expect(reducer(initialState, {
      type: types.TOGGLE_NAVBAR
    })).to.deep.equal(expectedState);

    initialState.slideToggleClass = 'none';

    expectedState.slideToggleClass = '';

    expect(reducer(initialState, {
      type:types.TOGGLE_NAVBAR
    })).to.deep.equal(expectedState);
  });


});
