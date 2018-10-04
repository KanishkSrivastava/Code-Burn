import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
export default combineReducers({
  loadingReducer,
  errorReducer
});
