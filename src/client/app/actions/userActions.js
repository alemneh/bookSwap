import * as types from '../ActionConstants';
import axios from 'axios';

export function fetchCurrentUser(user) {
  return function(dispatch) {
    dispatch({ type: types.FETCH_USER })
    axios.get(process.env.URL + '/users/' + user._id, {
      headers: {'token': token}
    })
    .then((res) => {
      dispatch({ type: types.FETCH_USER_FULFILLED, payload: res.data.data });
    })
    .catch((err) => {
      dispatch({ type: types.FETCH_USER_REJECTED, payload: err });
    });
  };
}

export function fetchUserTrades(user) {
  return function(dispatch) {
    dispatch({ type: types.FETCH_USER_TRADES });
    axios.get(process.env.URL + '/users/' + user._id + '/trades', {
      headers: { 'token': token}
    })
    .then((res) => {
      const { tradeRequests, pendingTrades } = res.data;
      dispatch({
        type: types.FETCH_USER_TRADES_FULFILLED,
        payload: { pendingTrades, tradeRequests }
      })
    })
    .catch((err) => {
      dispatch({ type: types.FETCH_USER_TRADES_REJECTED, payload: err });
    })
  }
}

export function fetchUserBooks(user) {
  return function(dispatch) {
    dispatch({ type: types.FETCH_USER_BOOKS })
    axios.get(process.env.URL + '/users/' + user._id + '/books', {
      headers: { 'token': token }
    })
      .then((res) => {
        dispatch({ type: types.FETCH_USER_BOOKS_FULFILLED, payload: res.data.data })
      })
      .catch((err) => {
        dispatch({ type: types.FETCH_USER_BOOKS_REJECTED, payload: err })
      })
  }
}


export function addBookToUser(book, user, token) {
  return function(dispatch) {
    dispatch({ type: types.ADD_BOOK_TO_USER })
    axios.post(process.env.URL + '/users/' + user._id + '/books', book, {
      headers: { 'token': token }
    })
    .then((res) => {
      dispatch({ type: types.ADD_BOOK_TO_USER_FULFILLED, payload: res.data.newBook })
    })
    .catch((err) => {
      dispatch({ type: types.ADD_BOOK_TO_USER_REJECTED, payload: err });
    })
  }
}

export function removeBookFromUser(book, userId) {
  return function(dispatch) {
    dispatch({ type: types.REMOVE_BOOK })
    axios.delete(process.env.URL + '/users/' + userId + '/books/' + book._id, {
      headers: { 'token': token }
    })
    .then((res) => {
      dispatch({ type: types.REMOVE_BOOK_FULFILLED, payload: res.data.book })
    })
    .catch((err) => {
      dispatch({ type: types.REMOVE_BOOK_REJECTED, payload: err })
    })
  }
}

export function updateUserInfo(user) {
  return function(dispatch) {
    dispatch({ type: types.UPDATE_USER });
    axios.put(process.env.URL + '/users/' + user._id, user, {
      headers: { 'token': token }
    })
    .then((res) => {
      dispatch({type: types.UPDATE_USER_FULFILLED, payload: res.data.user });
    })
    .catch((err) => {
      dispatch({type: types.UPDATE_USER_REJECTED, payload: res.data.message });
    });
  }
}

export function copyUserNameInput(val) {
  return {
    type: types.USERNAME_CHANGED,
    payload: val
  }
}

export function copyCityInput(val) {
  return {
    type: types.CITY_CHANGED,
    payload: val
  }
}

export function copyStateInput(val) {
  return {
    type: types.STATE_CHANGED,
    payload: val
  }
}
