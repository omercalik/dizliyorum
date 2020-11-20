import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ResultCard } from './ResultCard';

const ListContent = ({ state, list }) => {
  if (!state.firebase.auth.uid) return <Redirect from="/lists" to="/signin" />;
  return (
    <List>
      {list && list.length > 0 ? (
        list.map((item, index) => {
          return (
            <ListItem key={item.id}>
              <ResultCard movie={item} index={index} />
            </ListItem>
          );
        })
      ) : (
        <h3>Bu liste boş!</h3>
      )}
    </List>
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
)(ListContent);
