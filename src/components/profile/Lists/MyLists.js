import React from 'react';

import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { navigate, Redirect } from '@reach/router';
import Grid from '@material-ui/core/Grid';

import ListContent from './ListContent';
import Lists from './Lists';

const MyLists = ({ state, watchlist }) => {
  if (!state.firebase.auth.uid) return <Redirect from="/lists" to="/signin" />;

  return (
    <div style={{ minHeight: '80vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ListContent list={watchlist} />
        </Grid>
        
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state,
    watchlist: state.firebase.profile.watchlist,
    auth: state.firebase.auth,
  };
};

export default compose(
  firestoreConnect(() => [
    {
      collection: 'users',
      //orderBy: ['createdAt', 'desc'],
    },
  ]),
  connect(mapStateToProps)
)(MyLists);
