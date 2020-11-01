import React, { Component } from 'react';
import Notifications from './Notifications';
import MovieList from '../projects/MovieList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    const { lists, auth } = this.props;

    if (auth.uid) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">CONTENT GELECEK</div>
            <div className="col s12 m5 offset-m1">CONTENT GELECEK</div>
          </div>
        </div>
      );
    } else {
      return <h1>Your are not logged in!</h1>;
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    lists: state.firestore.ordered.lists,
    auth: state.firebase.auth,
  };
};

export default compose(
  firestoreConnect(() => [
    {
      collection: 'lists',
      //orderBy: ['createdAt', 'desc'],
    },
  ]),
  connect(mapStateToProps)
)(Dashboard);
