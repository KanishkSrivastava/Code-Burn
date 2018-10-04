import { combineReducers } from 'redux';
import loginReducer from './container/Login/Reducers';
import userReducer from './container/User/Reducer';
export default combineReducers({
  login: loginReducer,
  user: userReducer
});
