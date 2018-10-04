import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

import PrivateRoute from './utils/PrivateRoute';
import Home from './container/Home';
import Login from './container/Login';
import Signup from './container/Signup';
import Navigation from './container/Navigation';
import User from './container/User';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <PrivateRoute path="/user" component={User} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
