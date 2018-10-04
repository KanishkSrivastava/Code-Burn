import {
  LOADING_FOLDER_STRUCTURE,
  DONE_LOADING_FOLDER_STRUCTURE,
  FOLDER_STRUCTURE,
  ERROR_FETCHING_FILES
} from '../types';
import makeFolderStructure from '../../../utils/makeFolderStructure';
const initalState = {
  loading: false,
  data: {}
};

export default (state = initalState, action) => {
  switch (action.type) {
    case LOADING_FOLDER_STRUCTURE:
      return {
        ...state,
        loading: true
      };
    case DONE_LOADING_FOLDER_STRUCTURE:
      return {
        ...state,
        loading: false
      };
    case FOLDER_STRUCTURE:
      const folderStructure = makeFolderStructure(action.payload);
      return {
        ...state,
        data: folderStructure
      };
    default:
      return state;
  }
};
