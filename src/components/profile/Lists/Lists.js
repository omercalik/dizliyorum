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
import NoImage from '../../images/no_image.jpg';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../config/apiConfig';
import Spinner from '../../dashboard/Spinner';
import './list.css';

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
  const [isFetched, setisFetched] = React.useState(false);

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
          setisFetched(true);
        });
    };

    fetchData();
  }, []);

  const handleClick = (list) => {
    return navigate(`/lists/${list.title}`, {
      replace: true,
      state: { list, id: list.id },
    });
  };

  if (!isFetched) return <Spinner />;
  if (!state.firebase.auth.uid) return <Redirect from="/lists" to="/signin" />;
  return (
    <List>
      {console.log(myLists)}
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
              <div>
                <p>{list.title}</p>
              </div>
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
