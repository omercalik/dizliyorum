import React from 'react';
import { connect } from 'react-redux';
import { createList } from '../../../store/actions/listActions';
import { Redirect } from 'react-router-dom';
import { navigate } from '@reach/router';

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
    navigate('/');
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) navigate('/');
    return (
      <div style={{ minHeight: '80vh' }} className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create List</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
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
