import React from 'react';
import { connect } from 'react-redux';
import { createList } from '../../../store/actions/listActions';
import { Redirect } from 'react-router-dom';
import { navigate } from '@reach/router';
import './listform.css';

class CreateList extends React.Component {
  state = {
    title: '',
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.state);

    this.props.createList(this.state);
    navigate('/profile');
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) navigate('/');
    return (
      <div style={{ minHeight: '80vh' }} className="container">
        <form onSubmit={this.handleSubmit} className="create-list-form">
          <h5 className="create-list-header">Liste Oluştur</h5>
          <div className="input-field">
            <label className="create-list-label" htmlFor="title">
              Liste İsmi
            </label>
            <input
              className="create-list-input"
              type="text"
              id="title"
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <button className="btn create-list-button">Oluştur</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createList: (list) => dispatch(createList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateList);
