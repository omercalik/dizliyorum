import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { navigate } from '@reach/router';
import './sign.css';

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, auth } = this.props;
    if (auth.uid) navigate('/');
    return (
      <div style={{ minHeight: '80vh' }} className="container">
        <form onSubmit={this.handleSubmit} className="sign-in-form">
          <h5 className="sign-in-header">Sign In</h5>
          <div className="input-field">
            <label className="input-text" htmlFor="email">
              Email
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
              Password
            </label>
            <input
              className="input-text"
              type="password"
              id="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn signin-button z-depth-0">Login</button>
          </div>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
