import React from 'react';
import { connect } from 'react-redux';
import { navigate, Redirect } from '@reach/router';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firebase from '../../../config/fbConfig';
import ListContent from './ListContent';
import Lists from './Lists';
import { makeStyles } from '@material-ui/core';
import ListSearchBar from './ListSearchBar';
import { StyledListSearchBarResultContainer } from '../../styles/StyledListSearchBar';
import { addToList } from '../../../store/actions/listActions';

import { useHomeFetch } from '../../hooks/useHomeFetch';

import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  SEARCH_BASE_URL_MIX,
} from '../../../config/apiConfig';
let db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  listItem: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const ListPage = ({ state, location, addToList }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [listTemp, setlistTemp] = React.useState([{}]);

  React.useEffect(() => {
    const listRef = () => {
      db.collection('users/' + state.firebase.auth.uid + '/lists')
        .doc(location.state.list.id)
        .get()
        .then((snapshot) => {
          setlistTemp(snapshot.data().list);
        });
    };
    listRef();
  }, []);

  const [
    {
      state: { movies },
    },
    fetchMovies,
  ] = useHomeFetch(searchTerm);

  const searchMovies = (search) => {
    const endpoint = search ? SEARCH_BASE_URL_MIX + search : POPULAR_BASE_URL;

    setSearchTerm(search);
    fetchMovies(endpoint);
  };

  const deleteFromList = (movie, list) => {
    const authorId = state.firebase.auth.uid;
    let userRef = db.collection('users').doc(authorId);

    userRef
      .collection('lists')
      .doc(list.id)
      .update({
        list: firebase.firestore.FieldValue.arrayRemove(movie),
      })
      .then(() => {
        var tmpArr = [...listTemp];
        var index = tmpArr.indexOf(movie);
        if (index !== -1) {
          tmpArr.splice(index, 1);
          setlistTemp(tmpArr);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = (movie) => {
    addToList(movie, location.state.list);
    setlistTemp((prev) => [...prev, movie]);
  };

  if (!state.firebase.auth.uid) return <Redirect from="/lists" to="/signin" />;
  return (
    <div style={{ minHeight: '80vh' }}>
      {console.log(movies)}
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ListSearchBar callback={searchMovies} />
          <StyledListSearchBarResultContainer>
            <List>
              {searchTerm !== ''
                ? movies.map((movie) =>
                    movie.title ? (
                      <ListItem
                        movie={movie}
                        onClick={() => {
                          handleClick(movie);
                        }}
                        key={movie.id}
                        listId={location.state.list.id}
                        className={classes.listItem}
                      >
                        {movie.title}
                      </ListItem>
                    ) : (
                      <ListItem
                        movie={movie}
                        onClick={() => {
                          handleClick(movie);
                        }}
                        key={movie.id}
                        listId={location.state.list.id}
                        className={classes.listItem}
                      >
                        {movie.name}
                      </ListItem>
                    )
                  )
                : ''}
            </List>
          </StyledListSearchBarResultContainer>

          <ListContent
            func={deleteFromList}
            listRef={location.state.list}
            list={listTemp}
          />
        </Grid>
        <Grid item xs={3}>
          <h3>Listelerim</h3>
          <Lists />
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

const mapDispatchToProps = (dispatch) => {
  return {
    addToList: (movie, list) => dispatch(addToList(movie, list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
