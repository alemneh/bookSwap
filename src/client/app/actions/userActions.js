import * as types from '../ActionConstants';
import axios from 'axios';

export function fetchCurrentUser(userId, token) {
  return function(dispatch) {
    dispatch({ type: types.FETCH_USER })
    axios.get(process.env.URL + '/users/' + userId, {
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

export function fetchUserTrades(userId, token) {
  return function(dispatch) {
    dispatch({ type: types.FETCH_USER_TRADES });
    axios.get(process.env.URL + '/users/' + userId + '/trades', {
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

export function fetchUserBooks(userId, token) {
  return function(dispatch) {
    dispatch({ type: types.FETCH_USER_BOOKS })
    axios.get(process.env.URL + '/users/' + userId + '/books', {
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

export function removeBookFromUser(book, token) {
  return function(dispatch) {
    dispatch({ type: types.REMOVE_BOOK_FROM_USER })
    axios.delete(process.env.URL + '/users/' + book._owner + '/books/' + book._id, {
      headers: { 'token': token }
    })
    .then((res) => {
      dispatch({ type: types.REMOVE_BOOK_FROM_USER_FULFILLED, payload: book })
    })
    .catch((err) => {
      dispatch({ type: types.REMOVE_BOOK_FROM_USER_REJECTED, payload: err })
    })
  }
}

export function updateUserInfo(updatedUser, userId, token) {
  console.log(updatedUser);
  return function(dispatch) {
    dispatch({ type: types.UPDATE_USER });
    axios.put(process.env.URL + '/users/' + userId, updatedUser, {
      headers: { 'token': token }
    })
    .then((res) => {
      dispatch({type: types.UPDATE_USER_FULFILLED, payload: res.data.user });
    })
    .catch((err) => {
      dispatch({type: types.UPDATE_USER_REJECTED, payload: err });
    });
  }
}

export function declineTrade(trade, userId, token) {
  return function(dispatch) {
    dispatch({ type: types.DECLINE_TRADE });
    axios.delete(process.env.URL + '/users/' + userId + '/trades/' + trade._id, {
      headers: { 'token': token }
    })
    .then((res) => {
      dispatch({ type: types.DECLINE_TRADE_FULFILLED, payload: trade })
    })
    .catch((err) => {
      dispatch({ type: types.DECLINE_TRADE_REJECTED, payload: err });
    });
  };
}

export function acceptTrade(trade, userId, token) {
  return function(dispatch) {
    dispatch({ type: types.ACCEPT_TRADE })
    axios.put(process.env.URL + '/users/' + userId + '/trades/' + trade._id, trade, {
      headers: { 'token': token }
    })
    .then((res) => {
      dispatch({type: types.ACCEPT_TRADE_FULFILLED, payload: { trade, userId } });
    })
    .catch((err) => {
      dispatch({ type: types.ACCEPT_TRADE_REJECTED, payload: err });
    });
  };
}

export function viewTrade(trade) {
  return {
    type: types.VIEW_TRADE,
    payload: trade
  };
}

export function onEditClick() {
  return {
    type: types.EDIT_BTN_CLICK
  };
}

export function setBook2Remove(val) {
  return {
    type: types.SET_BOOK_TO_REMOVE,
    payload: val
  };
}

export function copySearchInput(val) {
  return {
    type: types.SEARCH_INPUT_CHANGE,
    payload: val
  };
}

export function onCancelClick() {
  return {
    type: types.CANCEL_BTN_CLICK
  };
}

export function copyUserNameInput(val) {
  return {
    type: types.USERNAME_CHANGED,
    payload: val
  };
}

export function copyEmailInput(val) {
  return {
    type: types.EMAIL_CHANGED,
    payload: val
  };
}

export function copyCityInput(val) {
  return {
    type: types.CITY_CHANGED,
    payload: val
  };
}

export function copyStateInput(val) {
  return {
    type: types.STATE_CHANGED,
    payload: val
  };
}

export function copyPasswordInput(val) {
  return {
    type: types.PASSWORD_CHANGED,
    payload: val
  };
}

export function copyPhoneNumberInput(val) {
  return {
    type: types.PHONE_NUMBER_CHANGED,
    payload: val
  };
}

export function emailCheckboxClick(val) {
  console.log('Actioon email: ' +val);
  return {
    type: types.EMAIL_NOTIFICATIONS_CLICKED,
    payload: val
  };
}

export function textCheckboxClick(val) {
  return {
    type: types.TEXT_NOTIFICATIONS_CLICKED,
    payload: val
  };
}
