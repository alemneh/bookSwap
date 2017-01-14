import * as types from '../ActionConstants';
import axios from 'axios';


export function declineTrade(trade, userId, token) {
  return function(dispatch) {
    dispatch({ type: types.DECLINE_TRADE });
    axios.delete(process.env.URL + '/users/' + userId + '/trades/' + trade._id, {
      headers: { 'token': token }
    })
    .then((res) => {
      dispatch({ type: types.DECLINE_TRADE_FULFILLED, payload: res.data.message })
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
      dispatch({type: types.ACCEPT_TRADE_FULFILLED, payload: res.data.message });
    })
    .catch((err) => {
      dispatch({ type: types.ACCEPT_TRADE_REJECTED, payload: err });
    });
  };
}
