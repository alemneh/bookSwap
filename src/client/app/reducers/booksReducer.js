import * as types from '../ActionConstants';

const initialState = {
  books: [],
  requesteeBook: null,
  requesterBook: null,
  fetching: false,
  fetched: false,
  error: null
}

export default function(state=initialState, action) {
  switch (action.type) {
    case types.FETCH_ALL_BOOKS: {
      return {...state, fetching: true}
    }
    case types.FETCH_ALL_BOOKS_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.FETCH_ALL_BOOKS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        books: action.payload
      }
    }
    case types.MAKE_TRADE_REQUEST: {
      return {...state, fetching: false}
    }
    case types.MAKE_TRADE_REQUEST_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.MAKE_TRADE_REQUEST_FULFILLED: {
      const requesteeBookId = action.payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        books
      }
    }
  }
}
