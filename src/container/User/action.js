import axios from 'axios';
import {
  LOADING_FOLDER_STRUCTURE,
  DONE_LOADING_FOLDER_STRUCTURE,
  FOLDER_STRUCTURE,
  ERROR_FETCHING_FILES
} from './types';
import { URL } from '../../credentials';

export const fetchAllFileName = () => async dispatch => {
  dispatch({
    type: LOADING_FOLDER_STRUCTURE
  });
  const session = JSON.parse(localStorage.getItem('session'));
  const userId = session.idToken.payload['cognito:username'];
  const payload = { userId };
  var options = {
    headers: {
      Authorization: session.idToken.jwtToken
    }
  };
  try {
    const res = await axios.post(`${URL}/getallfilelist`, payload, options);
    dispatch({
      type: FOLDER_STRUCTURE,
      payload: res.data.allFiles.Contents
    });
  } catch (e) {
    dispatch({
      type: ERROR_FETCHING_FILES,
      payload: e
    });
  }
  dispatch({
    type: DONE_LOADING_FOLDER_STRUCTURE
  });
};
