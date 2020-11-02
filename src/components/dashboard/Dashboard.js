import React, { Component } from 'react';
import Notifications from './Notifications';
import MovieList from '../projects/MovieList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { TopList } from '../profile/Lists/TopList';
import Profile from '../profile/Profile';

class Dashboard extends Component {
  render() {
    const { lists, auth } = this.props;
    
    if (auth.uid) {
      return (
        <Profile/>
      );
    } else {
      return;
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


