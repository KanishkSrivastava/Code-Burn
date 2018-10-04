import React from 'react';
import { NavLink } from 'react-router-dom';
import checkAuth from '../../utils/checkAuth';
const LogoutButton = () => {
  localStorage.removeItem('sessionAccessToken');
  localStorage.removeItem('session');
};
const Navigation = () => {
  if (checkAuth()) {
    return (
      <div>
        <nav>
          <div className="nav-wrapper teal lighten-2">
            <NavLink to="/">
              <span className="brand-logo">Code Burn</span>
            </NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/login" onClick={LogoutButton}>
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav>
          <div className="nav-wrapper teal lighten-2">
            <NavLink to="/">
              <span className="brand-logo">Code Burn</span>
            </NavLink>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
};
export default Navigation;
