import React from 'react';

import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import { signUp } from '../../store/actions/authActions';
import './sign.css';

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) navigate('/');
    return (
      <div style={{ minHeight: '80vh' }} className="container">
        <form onSubmit={this.handleSubmit} className="sign-in-form">
          <h5 className="sign-in-header">Kayıt Ol</h5>
          <div className="input-field">
            <label className="input-text" htmlFor="email">
              E-mail
            </label>
            <input
              className="input-text"
              type="email"
              id="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label className="input-text" htmlFor="password">
              Şifre
            </label>
            <input
              className="input-text"
              type="password"
              id="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label className="input-text" htmlFor="firstName">
              Adınız
            </label>
            <input
              className="input-text"
              type="text"
              id="firstName"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label className="input-text" htmlFor="lastName">
              Soyadınız
            </label>
            <input
              className="input-text"
              type="text"
              id="lastName"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn signin-button z-depth-0">Kayıt Ol</button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
