import { ERROR_IN_LOGIN, NO_ERROR_IN_LOGIN } from '../types';

const initialState = {
  error: ''
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR_IN_LOGIN:
      return {
        ...state,
        error: action.payload
      };
    case NO_ERROR_IN_LOGIN:
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
};
