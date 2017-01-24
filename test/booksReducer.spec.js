import React from 'react';
import { expect } from 'chai';

import * as types from '../src/client/app/ActionConstants';
import reducer from '../src/client/app/reducers/booksReducer';

let initialState, expectedState;
let books = [{_id: 2, title: 'War'}, {_id:1, title: 'Sam'}];

describe('booksReducer', () => {
  beforeEach(() => {
    initialState = {
      books: [],
      requesteeBook: null,
      requesterBook: null,
      fetching: false,
      fetched: false,
      success: null,
      error: null
    };

    expectedState = {
      books: [],
      requesteeBook: null,
      requesterBook: null,
      fetching: false,
      fetched: false,
      success: null,
      error: null
    };
  });

  it('should handle FETCH_ALL_BOOKS', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.FETCH_ALL_BOOKS
    })).to.deep.equal(expectedState);
  });

  it('should handle FETCH_ALL_BOOKS_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {error: 'Error'};

    expect(reducer(initialState, {
      type: types.FETCH_ALL_BOOKS_REJECTED,
      payload: { error: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle FETCH_ALL_BOOKS_FULFILLED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.books = books;

    expect(reducer(initialState, {
      type: types.FETCH_ALL_BOOKS_FULFILLED,
      payload: books
    })).to.deep.equal(expectedState);
  });

  it('should handle MAKE_TRADE_REQUEST', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.MAKE_TRADE_REQUEST
    })).to.deep.equal(expectedState);
  });

  it('should handle MAKE_TRADE_REQUEST_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = { error: 'Error'};

    expect(reducer(initialState, {
      type: types.MAKE_TRADE_REQUEST_REJECTED,
      payload: {error: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle MAKE_TRADE_REQUEST_FULFILLED', () => {
    initialState.fetching = true;
    initialState.books = books;


    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.success = 'Trade Request Sent!';
    expectedState.books = books.filter(b => b._id != 1 );

    expect(reducer(initialState, {
      type: types.MAKE_TRADE_REQUEST_FULFILLED,
      payload: { requesteeBookId: 1, success: 'Trade Request Sent!'}
    })).to.deep.equal(expectedState);
  });

  it('should handle SET_REQUESTEE_BOOK', () => {
    expectedState.requesteeBook = {_id: 1, title: 'War'};
    expect(reducer(initialState, {
      type: types.SET_REQUESTEE_BOOK,
      payload: {_id: 1, title: 'War'}
    })).to.deep.equal(expectedState);
  });

  it('should handle SET_REQUESTER_BOOK', () => {
    expectedState.requesterBook = {_id: 1, title: 'War'};
    expect(reducer(initialState, {
      type: types.SET_REQUESTER_BOOK,
      payload: {_id: 1, title: 'War'}
    })).to.deep.equal(expectedState);
  });

  it('should handle CANCEL_REQUESTER_BOOK', () => {
    initialState.requesterBook = {_id: 1, title: 'War'};

    expectedState.requesterBook = null;
    expect(reducer(initialState, {
      type: types.CANCEL_REQUESTER_BOOK
    })).to.deep.equal(expectedState);
  });

});
