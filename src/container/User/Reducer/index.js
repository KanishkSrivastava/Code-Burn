import { combineReducers } from 'redux';
import folderStructureReducer from './folderStructure';
export default combineReducers({
  folderStructure: folderStructureReducer
});
