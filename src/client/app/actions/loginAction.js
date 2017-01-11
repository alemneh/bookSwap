import * as types from '../ActionConstants';
import axios from 'axios';

export function handleLogin(username, password) {
  return function(dispatch) {
    dispatch({type: types.LOGIN})
    axios.get(process.env.URL + '/login', {
      auth: {
        username: 'Tesfu',
        password: 'password'
      }
    })
    .then((res) => {
      const { token, user} = res.data;
      dispatch({type: types.LOGIN_FULFILLED, payload: {token, user} })
    })
    .catch((err) => {
      dispatch({type: types.LOGIN_REJECTED, payload: err })
    });
  };
}
