import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles.css';

import checkAuth from '../../utils/checkAuth';
import { loginAction } from './actions';
import InputField from '../../utils/inputField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'kanishk1997@gmail.com',
      password: '123456789'
    };
  }
  componentDidMount() {
    if (checkAuth()) {
      this.props.history.push('/user');
    }
  }
  componentWillReceiveProps(nextProps) {
    nextProps.history.push('/user');
  }
  async handleEmail(event) {
    await this.setState({ email: event.target.value });
  }
  async handlePassword(event) {
    await this.setState({ password: event.target.value });
  }
  handleLoginButtonPress() {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginAction(user);
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="login-card-margin-top row">
            <div className="col s12 m6">
              <div className="card medium z-depth-3">
                <div
                  className={this.props.login.loadingReducer.loading === true ? 'progress' : 'hide'}
                >
                  <div className="indeterminate" />
                </div>
                <div className="card-content white-text">
                  <span className="card-title teal-text">Login</span>
                  <div className="col s8">
                    <div className="row">
                      <div className="input-field col s12">
                        <InputField
                          error={this.props.login.errorReducer.error !== '' ? 'invalid' : 'valid'}
                          type="text"
                          placeHolder="Email"
                          value={this.state.email}
                          onChangeEvent={this.handleEmail.bind(this)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <InputField
                          type="password"
                          placeHolder="Password"
                          value={this.state.password}
                          onChangeEvent={this.handlePassword.bind(this)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s0 m3" />
                      <div className="col s12 m9">
                        <div className="row">
                          <button
                            onClick={this.handleLoginButtonPress.bind(this)}
                            className="waves-effect waves-light btn z-depth-3"
                          >
                            Login
                          </button>
                          <button className="waves-effect waves-light btn z-depth-3 forgot-password-button-margin-left">
                            Forgot Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    login: state.login
  };
};
export default connect(
  mapStateToProps,
  { loginAction }
)(Login);
