import React from 'react';
import * as types from '../ActionConstants';

const initialState = {
  user: null,
  pendingTrades: [],
  tradeRequests: [],
  books: [],
  fetching: false,
  fetched: false,
  error: null,
  newUserName: '',
  newState: '',
  newCity: ''
};

export default function(state=initialState, action) {
  switch(action.type) {
    case types.FETCH_USER: {
      return {...state, fetching: true}
    }
    case types.FETCH_USER_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.FETCH_USER_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload
      }
    }
    case types.FETCH_USER_TRADES: {
      return {...state, fething: true}
    }
    case types.FETCH_USER_TRADES_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.FETCH_USER_TRADES_FULFILLED: {
      const { pendingTrades, tradeRequests } = action.payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        pendingTrades,
        tradeRequests
      }
    }
    case types.FETCH_USER_BOOKS: {
      return {...state, fetching: true}
    }
    case types.FETCH_USER_BOOKS_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.FETCH_USER_BOOKS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        books: action.payload
      }
    }
    case types.ADD_BOOK_TO_USER: {
      return {...state, fetching: true}
    }
    case types.ADD_BOOK_TO_USER_REJECTED: {
      return {...state, fetching: false, error: err}
    }
    case types.ADD_BOOK_TO_USER_FULFILLED: {
      const newBook = action.payload;
      let newBooks = [...state.books].concat(newBook);
      return {
        ...state,
        fetching: false,
        fetched: true,
        books: newBooks
      }
    }
    case types.REMOVE_BOOK: {
      return {...state, fetching: true}
    }
    case types.REMOVE_BOOK_REJECTED: {
      return {...state, fetching: false, error: err}
    }
    case types.REMOVE_BOOK_FULFILLED: {
      const removeBook = action.payload;
      let newBooks = [...state.books].filter(book => book._id != newBook._id);
      return {
        ...state,
        fetching: false,
        fetched: true,
        books: newBooks
      }
    }
    case types.UPDATE_USER: {
      return {...state, fetching: true}
    }
    case types.UPDATE_USER_REJECTED: {
      return {...state, fetching: false, error: action.payload }
    }
    case types.UPDATE_USER_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload
      }
    }
    case types.USERNAME_CHANGED: {
      return {...state, newUserName: action.payload}
    }
    case types.CITY_CHANGED: {
      return {...state, newCity: action.payload}
    }
    case types.STATE_CHANGED: {
      return {...state, newState: action.payload}
    }
  }
  return state;
}
