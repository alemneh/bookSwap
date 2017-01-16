import * as types from '../ActionConstants';
import axios from 'axios';

export function handleLogin(username, password) {
  return function(dispatch) {
    dispatch({type: types.LOGIN});
    axios.get(process.env.URL + '/login', {
      auth: {
        username,
        password
      }
    })
    .then((res) => {
      const { token, user} = res.data;
      dispatch({type: types.LOGIN_FULFILLED, payload: {token, user} });
    })
    .catch((err) => {
      dispatch({type: types.LOGIN_REJECTED, payload: err });
    });
  };
}

export function signUp(newUser) {
  return function(dispatch) {
    dispatch({type: types.SIGN_UP});
    axios.post(process.env.URL + '/signup', newUser)
      .then((res) => {
        dispatch({type: types.SIGN_UP_FULFILLED, payload: res.data.message});
      })
      .catch((err) => {
        dispatch({type: types.SIGN_UP_REJECTED, payload: err });
      });
  };
}

export function handleLogout() {
  return {
    type: types.LOGOUT
  };
}
