import { LOADING, DONE_LOADING, ERROR_IN_LOGIN, NO_ERROR_IN_LOGIN } from './types';
import Amplify, { Auth } from 'aws-amplify';

import { configCognito } from '../../credentials';

Amplify.configure(configCognito);

export const loginAction = userLoggingIn => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    await Auth.signIn(userLoggingIn.email, userLoggingIn.password);
    const session = await Auth.currentSession();
    console.log(session);
    const stringSession = await JSON.stringify(session);
    localStorage.setItem('session', stringSession);
    localStorage.setItem('sessionAccessToken', session.accessToken.jwtToken);
    dispatch({
      type: NO_ERROR_IN_LOGIN
    });
  } catch (error) {
    dispatch({
      type: ERROR_IN_LOGIN,
      payload: error
    });
  }
  dispatch({
    type: DONE_LOADING
  });
};
