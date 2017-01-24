import * as types from '../ActionConstants';

const initialState = {
  books: [],
  requesteeBook: null,
  requesterBook: null,
  fetching: false,
  fetched: false,
  success: null,
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
      return {...state, fetching: true}
    }
    case types.MAKE_TRADE_REQUEST_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }
    case types.MAKE_TRADE_REQUEST_FULFILLED: {
      const { requesteeBookId, success } = action.payload;
      const books = state.books.filter((book) => book._id != requesteeBookId);

      return {
        ...state,
        fetching: false,
        fetched: true,
        success,
        books
      }
    }
    case types.SET_REQUESTER_BOOK: {
      return {...state, requesterBook: action.payload}
    }
    case types.SET_REQUESTEE_BOOK: {
      return {...state, requesteeBook: action.payload}
    }
    case types.CANCEL_REQUESTER_BOOK: {
      return {...state, requesterBook: null}
    }
    case types.LOGOUT:{
      return initialState
    }
  }
  return state;
}
