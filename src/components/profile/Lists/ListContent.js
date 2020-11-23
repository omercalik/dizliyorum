import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ResultCard } from './ResultCard';
import Spinner from '../../dashboard/Spinner';
import { deleteFromWatchList } from '../../../store/actions/watchListActions';
import { deleteFromList } from '../../../store/actions/listActions';
const ListContent = ({
  state,
  list,
  watchlist,
  deleteFromWatchList,
  deleteFromList,
  listRef,
  func,
}) => {
  if (!state.firebase.auth.uid) return <Redirect from="/lists" to="/signin" />;
  if (!list) return <Spinner />;
  const handleClickDelete = (list, item, index) => {
    if (list === watchlist) {
      const indexStr = index.toString();
      deleteFromWatchList(item, indexStr);
    } else {
      console.log(list.id);
      func(item, listRef);
    }
  };
  return (
    <List>
      {list && list.length > 0 ? (
        list.map((item, index) => {
          return (
            <ListItem key={item.id}>
              <ResultCard id={item.id} movie={item} index={index}>
                <a
                  onClick={() => {
                    handleClickDelete(list, item, index);
                  }}
                  className="btn-floating"
                >
                  <i className="material-icons red medium">clear</i>
                </a>
              </ResultCard>
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromWatchList: (movie) => dispatch(deleteFromWatchList(movie)),
    deleteFromList: (movie, list) => dispatch(deleteFromList(movie, list)),
  };
};

export default compose(
  firestoreConnect(() => [
    {
      collection: 'users',
      //orderBy: ['createdAt', 'desc'],
    },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(ListContent);
