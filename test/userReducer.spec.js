import React from 'react';
import { expect } from 'chai';

import * as types from '../src/client/app/ActionConstants';
import reducer from '../src/client/app/reducers/userReducer';

let initialState, expectedState, books,
    state = {
      user: null,
      pendingTrades: [],
      tradeRequests: [],
      books: [],
      fetching: false,
      fetched: false,
      error: null,
      newUserName: '',
      newPassword: '',
      newState: '',
      newCity: '',
      search: '',
      trade: null,
      viewTrade: false,
      book2Remove: null,
      isEditing: false
    };

describe('userReducer', () => {
  beforeEach(() => {
    initialState = {...state};
    expectedState = {...state};
    books = [{_id: 2, title: 'War'}, {_id:1, title: 'Sam'}];

  });

  it('should handle FETCH_USER', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.FETCH_USER
    })).to.deep.equal(expectedState);
  });

  it('should handle FETCH_USER_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {error: 'Error'};

    expect(reducer(initialState, {
      type: types.FETCH_USER_REJECTED,
      payload: {error: 'Error'}
    })).to.deep.equal(expectedState)
  });

  it('should handle FETCH_USER_FULFILLED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.user = {name: 'Alem'};

    expect(reducer(initialState, {
      type: types.FETCH_USER_FULFILLED,
      payload: {name: 'Alem'}
    })).to.deep.equal(expectedState);
  });

  it('should handle FETCH_USER_TRADES', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.FETCH_USER_TRADES
    })).to.deep.equal(expectedState);
  });

  it('should handle FETCH_USER_TRADES_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = { error: 'Error'}

    expect(reducer(initialState, {
      type: types.FETCH_USER_TRADES_REJECTED,
      payload: { error: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle FETCH_USER_TRADES_FULFILLED', () => {
    const tradeRequests = [{_id: 1, name:'Request'}];
    const pendingTrades = [{_id: 2, name: 'Pending'}];

    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.pendingTrades = pendingTrades;
    expectedState.tradeRequests = tradeRequests;

    expect(reducer(initialState, {
      type: types.FETCH_USER_TRADES_FULFILLED,
      payload: {pendingTrades, tradeRequests}
    })).to.deep.equal(expectedState);
  });

  it('should handle FETCH_USER_BOOKS', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.FETCH_USER_BOOKS
    })).to.deep.equal(expectedState);
  });

  it('should handle FETCH_USER_BOOKS_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {error: 'Error'};

    expect(reducer(initialState, {
      type: types.FETCH_USER_BOOKS_REJECTED,
      payload: {error: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle FETCH_USER_BOOKS_FULFILLED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.books = books;

    expect(reducer(initialState, {
      type: types.FETCH_USER_BOOKS_FULFILLED,
      payload: books
    })).to.deep.equal(expectedState);
  });

  it('should handle ADD_BOOK_TO_USER', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.ADD_BOOK_TO_USER
    })).to.deep.equal(expectedState);
  });

  it('should handle ADD_BOOK_TO_USER_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {error: 'Error'};

    expect(reducer(initialState, {
      type: types.ADD_BOOK_TO_USER_REJECTED,
      payload: {error: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle ADD_BOOK_TO_USER_FULFILLED', () => {
    initialState.fetching = true;
    initialState.books = books;

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.books = books.concat({_id: 4, title: 'Maker' });

    expect(reducer(initialState, {
      type: types.ADD_BOOK_TO_USER_FULFILLED,
      payload: {_id: 4, title: 'Maker' }
    })).to.deep.equal(expectedState);
  });

  it('should handle REMOVE_BOOK_FROM_USER', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.REMOVE_BOOK_FROM_USER
    })).to.deep.equal(expectedState);
  });

  it('should handle REMOVE_BOOK_FROM_USER_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {error: 'Error'};

    expect(reducer(initialState, {
      type: types.REMOVE_BOOK_FROM_USER_REJECTED,
      payload: {error: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle REMOVE_BOOK_FROM_USER_FULFILLED', () => {
    initialState.fetching = true;
    initialState.books = books;

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.books = books.filter(book => book._id != 1);

    expect(reducer(initialState, {
      type: types.REMOVE_BOOK_FROM_USER_FULFILLED,
      payload: {_id: 1, title: 'Sam'}
    })).to.deep.equal(expectedState);
  });


  it('should handle UPDATE_USER', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.UPDATE_USER
    })).to.deep.equal(expectedState);
  });

  it('should handle UPDATE_USER_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {error: 'Error'};

    expect(reducer(initialState, {
      type: types.UPDATE_USER_REJECTED,
      payload: {error: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle UPDATE_USER_FULFILLED', () => {
    initialState.fetching = true;
    initialState.user = {name: 'Alem', age: 25};

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.user = {name: 'Asefa', age: 25};

    expect(reducer(initialState, {
      type: types.UPDATE_USER_FULFILLED,
      payload: {name: 'Asefa', age: 25}
    })).to.deep.equal(expectedState);
  });

  it('should handle ACCEPT_TRADE', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.ACCEPT_TRADE
    })).to.deep.equal(expectedState);
  });

  it('should handle ACCEPT_TRADE_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {error: 'Error'};

    expect(reducer(initialState, {
      type: types.ACCEPT_TRADE_REJECTED,
      payload: {error: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle ACCEPT_TRADE_FULFILLED', () => {
    const trade = {
      _id: 5,
      requesteeBook: 1,
      requesterBookTitle: 'Mad Max',
      requesteeBookTitle: 'Sam',
      requesterImgUrl: './pic.jpg',
      requesteeName: 'Alem'
    }
    initialState.fetching = true;
    initialState.books = books;
    expectedState.tradeRequests = [trade];

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.tradeRequests = [...expectedState.tradeRequests]
                                    .filter(t => t._id != 5);
    expectedState.books = books.filter(book => book._id != 1).concat({
      _owner: 1,
      title: 'Mad Max',
      isPendingTrade: false,
      imgUrl: './pic.jpg',
      owner: 'Alem'
    })

    expect(reducer(initialState, {
      type: types.ACCEPT_TRADE_FULFILLED,
      payload: { trade, userId: 1}
    })).to.deep.equal(expectedState);
  });

  it('should handle DECLINE_TRADE', () => {
    expectedState.fetching = true;

    expect(reducer(initialState, {
      type: types.DECLINE_TRADE
    })).to.deep.equal(expectedState);
  });

  it('should handle DECLINE_TRADE_REJECTED', () => {
    initialState.fetching = true;

    expectedState.fetching = false;
    expectedState.error = {error: 'Error'};

    expect(reducer(initialState, {
      type: types.DECLINE_TRADE_REJECTED,
      payload: {error: 'Error'}
    })).to.deep.equal(expectedState);
  });

  it('should handle DECLINE_TRADE_FULFILLED', () => {
    const trade = {
      _id: 5,
      requesteeBook: 1,
      requesterBookTitle: 'Mad Max',
      requesteeBookTitle: 'Sam',
      requesterImgUrl: './pic.jpg',
      requesteeName: 'Alem'
    }
    initialState.fetching = true;
    expectedState.tradeRequests = [trade];
    expectedState.pendingTrades = [trade];

    expectedState.fetching = false;
    expectedState.fetched = true;
    expectedState.tradeRequests = [];
    expectedState.pendingTrades = [];


    expect(reducer(initialState, {
      type: types.DECLINE_TRADE_FULFILLED,
      payload: { trade }
    })).to.deep.equal(expectedState);
  });

  it('should handle EDIT_BTN_CLICK', () => {
    expectedState.isEditing = true;

    expect(reducer(initialState, {
      type: types.EDIT_BTN_CLICK
    })).to.deep.equal(expectedState);
  });

  it('should handle CANCEL_BTN_CLICK', () => {
    initialState.isEditing = true;
    initialState.newUserName = 'Alem';
    initialState.newPassword = 'password';
    initialState.newState = 'WA';
    initialState.newCity = 'Seattle';

    expectedState.isEditing = false;
    expectedState.newUserName = '';
    expectedState.newPassword = '';
    expectedState.newState = '';
    expectedState.newCity = '';

    expect(reducer(initialState, {
      type: types.CANCEL_BTN_CLICK
    })).to.deep.equal(expectedState);
  });

});
