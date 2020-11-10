import React from 'react';
import { Link } from '@reach/router';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from '../../../config/fbConfig';
import { Redirect } from '@reach/router';

let db = firebase.firestore();

const MyLists = ({ state }) => {
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

  if (!state.firebase.auth.uid) return <Redirect from="/lists" to="/signin" />;
  return (
    <div className="project-list section">
      {myLists &&
        myLists.map((list) => {
          return (
            <Link to={'/list/' + list.title} key={list.id}>
              {list.title}
            </Link>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state,
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
