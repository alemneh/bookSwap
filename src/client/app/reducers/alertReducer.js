import * as types from '../ActionConstants';

const initialState = {
  message: '',
  error: true
};

export default function(state=initialState, action) {
  switch (action.type) {
    case types.SET_ERR_MSG: {
      const { message, error } = action.payload;
      return {...state, message, error };
    }
  }
  return state;
}
