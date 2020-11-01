import React from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

const MyLists = ({ lists }) => {
  console.log(lists);
  return (
    <div className="project-list section">
      {lists &&
        lists.map((list) => {
          return (
            <Link to={'/list/' + list.id} key={list.id}>
              {list.title}
            </Link>
          );
        })}
    </div>
  );
};

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
)(MyLists);
