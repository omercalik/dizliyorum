import React from 'react';
import { navigate } from '@reach/router';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from '../../../config/fbConfig';
import { Redirect } from '@reach/router';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

let db = firebase.firestore();
const useStyles = makeStyles((theme) => ({
  listItem: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const MyLists = ({ state }) => {
  const classes = useStyles();
  const [myLists, setMyLists] = React.useState();

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

  const handleClick = (list) => {
    console.log(list);
    navigate(`/lists/${list.title}`, { state: { list, id: list.id } });
  };

  if (!state.firebase.auth.uid) return <Redirect from="/lists" to="/signin" />;
  return (
    <List>
      {myLists &&
        myLists.map((list) => {
          return (
            <ListItem
              hover="true"
              key={list.id}
              className={classes.listItem}
              onClick={() => {
                handleClick(list);
              }}
            >
              {list.title}
            </ListItem>
          );
        })}
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
)(MyLists);
