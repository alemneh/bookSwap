import axios from 'axios';
import * as types from '../ActionConstants';

export function fetchAllBooks(token) {
  return function(dispatch) {
    dispatch({type: types.FETCH_ALL_BOOKS})
    axios.get(process.env.URL + '/books4trade', {
      headers: { token }
    })
    .then((res) => {
      dispatch({type: types.FETCH_ALL_BOOKS_FULFILLED, payload: res.data.books});
    })
    .catch((err) => {
      dispatch({type: types.FETCH_ALL_BOOKS_REJECTED, payload: err });
    })
  }
}

export function makeTradeRequest(trade, token) {
  return function(dispatch) {
    dispatch({type: types.MAKE_TRADE_REQUEST})
    axios.post(process.env.URL + '/users/' + trade.requesterId + '/trades', {trade}, {
      headers: { token }
    })
    .then((res) => {
      dispatch({type: types.MAKE_TRADE_REQUEST_FULFILLED, payload: {
        requesteeBookId: trade.requesteeBook,
        success: res.data.message
      }});
    })
    .catch((err) => {
      dispatch({type: types.MAKE_TRADE_REQUEST_REJECTED, payload: err});
    });
  }
}

export function setRequesteeBook(book) {
  return {
    type: types.SET_REQUESTEE_BOOK,
    payload: book
  };
}

export function setRequesterBook(book) {
  return {
    type: types.SET_REQUESTER_BOOK,
    payload: book
  };
}


export function cancelRequesterBook(book) {
  return {
    type: types.CANCEL_REQUESTER_BOOK,
    payload: book
  };
}
