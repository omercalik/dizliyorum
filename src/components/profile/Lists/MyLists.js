import React from 'react';
import { Link } from '@reach/router';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from '../../../config/fbConfig';
import { Redirect } from '@reach/router';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ResultCard } from './ResultCard';

let db = firebase.firestore();

const MyLists = ({ state, watchlist }) => {
  const [myLists, setMyLists] = React.useState();
  console.log(watchlist);

  React.useEffect(() => {
    const fetchData = () => {
      db.collection('users/' + state.firebase.auth.uid + '/lists')
        .get()
        .then((snapshot) => {
          let movieLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setMyLists(movieLists);
        });
    };

    fetchData();
  }, []);

  if (!state.firebase.auth.uid) return <Redirect from="/lists" to="/signin" />;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <List>
            {watchlist &&
              watchlist.map((item) => {
                return (
                  <ListItem>
                    <ResultCard movie={item} />
                  </ListItem>
                );
              })}
          </List>
        </Grid>
        <Grid item xs={3}>
          <h3>Listelerim</h3>
          <List>
            {myLists &&
              myLists.map((list) => {
                return (
                  <ListItem>
                    <Link to={'/list/' + list.title} key={list.id}>
                      {list.title}
                    </Link>
                  </ListItem>
                );
              })}
          </List>
        </Grid>
      </Grid>
    </>
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
