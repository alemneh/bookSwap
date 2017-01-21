import * as types from '../ActionConstants';

export function setAlertMessage(message, error) {
  return {
    type: types.SET_ERR_MSG,
    payload: { message, error }
  };
}
