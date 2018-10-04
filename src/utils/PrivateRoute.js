import checkAuth from './checkAuth';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (checkAuth() === true ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);
export default PrivateRoute;
