import { LOADING, DONE_LOADING } from '../types';

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case DONE_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
