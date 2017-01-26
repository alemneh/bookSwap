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
  newPassword: '',
  newPhoneNumber: '',
  newEmail: '',
  newState: '',
  newCity: '',
  search: '',
  email_notification: false,
  text_notification: false,
  trade: null,
  viewTrade: false,
  book2Remove: null,
  isEditing: false
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
      return {...state, fetching: true}
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
      return {...state, fetching: false, error: action.payload}
    }
    case types.ADD_BOOK_TO_USER_FULFILLED: {
      const newBook = action.payload;
      let newBooks = [...state.books].concat(newBook);
      return {
        ...state,
        fetching: false,
        fetched: true,
        search: '',
        books: newBooks
      }
    }
    case types.REMOVE_BOOK_FROM_USER: {
      return {...state, fetching: true}
    }
    case types.REMOVE_BOOK_FROM_USER_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.REMOVE_BOOK_FROM_USER_FULFILLED: {
      const removeBook = action.payload;
      let newBooks = [...state.books].filter(book => book._id != removeBook._id);
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
        isEditing: false,
        user: action.payload
      }
    }
    case types.ACCEPT_TRADE: {
      return {...state, fetching: true}
    }
    case types.ACCEPT_TRADE_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.ACCEPT_TRADE_FULFILLED: {
      const {trade, userId} = action.payload
      const newBook = {
        _owner: userId,
        title: trade.requesterBookTitle,
        imgUrl: trade.requesterImgUrl,
        owner: trade.requesteeName,
        isPendingTrade: false
      }

      const newBooks = [...state.books].filter(book => book._id != trade.requesteeBook)
                                       .concat(newBook);
      const newTradeRequests = [...state.tradeRequests].filter(t => t._id != trade._id)

      return {
        ...state,
        fetching: false,
        fetched: true,
        viewTrade: false,
        trade: null,
        books: newBooks,
        tradeRequests: newTradeRequests
      }
    }
    case types.DECLINE_TRADE: {
      return {...state, fetching: true}
    }
    case types.DECLINE_TRADE_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.DECLINE_TRADE_FULFILLED: {
      const trade = action.payload
      const newTradeRequests = [...state.tradeRequests].filter(t => t._id != trade._id)
      const newPendingTrades = [...state.pendingTrades].filter(t => t._id != trade._id)

      return {
        ...state,
        fetching: false,
        fetched: true,
        viewTrade: false,
        trade: null,
        tradeRequests: newTradeRequests,
        pendingTrades: newPendingTrades
      }
    }
    case types.EDIT_BTN_CLICK: {
      return {...state, isEditing: true}
    }
    case types.CANCEL_BTN_CLICK: {
      return {
        ...state,
        isEditing: false,
        newUserName: '',
        newPassword: '',
        newState: '',
        newCity: ''
      }
    }
    case types.USERNAME_CHANGED: {
      return {...state, newUserName: action.payload}
    }
    case types.EMAIL_CHANGED: {
      return {...state, newEmail: action.payload}
    }
    case types.PASSWORD_CHANGED: {
      return {...state, newPassword: action.payload}
    }
    case types.CITY_CHANGED: {
      return {...state, newCity: action.payload}
    }
    case types.STATE_CHANGED: {
      return {...state, newState: action.payload}
    }
    case types.EMAIL_NOTIFICATIONS_CLICKED: {
      return {...state, email_notification: !state.email_notification}
    }
    case types.TEXT_NOTIFICATIONS_CLICKED: {
      return {...state, text_notification: !state.text_notification}
    }
    case types.PHONE_NUMBER_CHANGED: {
      return {...state, newPhoneNumber: action.payload}
    }
    case types.SEARCH_INPUT_CHANGE: {
      return {...state, search: action.payload}
    }
    case types.SET_BOOK_TO_REMOVE: {
      const title = action.payload;
      const book2Remove = [...state.books].filter(book => book.title === title)[0]
      return {...state, book2Remove}
    }
    case types.VIEW_TRADE: {
      return {...state, viewTrade: true, trade: action.payload}
    }
    case types.LOGOUT:{
      return initialState
    }
  }
  return state;
}
