import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListContent from './ListContent';
import Lists from './Lists';
import ListSearchBar from './ListSearchBar';
import { StyledListSearchBarResultContainer } from '../../styles/StyledListSearchBar';
import { addToList } from '../../../store/actions/listActions';

import { useHomeFetch } from '../../hooks/useHomeFetch';

import { POPULAR_BASE_URL, SEARCH_BASE_URL } from '../../../config/apiConfig';

const ListPage = ({ state, location, addToList }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [
    {
      state: { movies },
    },
    fetchMovies,
  ] = useHomeFetch(searchTerm);
  console.log(location);

  const searchMovies = (search) => {
    const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

    setSearchTerm(search);
    fetchMovies(endpoint);
  };

  //console.log(movies);

  const handleClick = (movie) => {
    addToList(movie, location.state.list);
  };

  if (!state.firebase.auth.uid) return <Redirect from="/lists" to="/signin" />;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <ListSearchBar callback={searchMovies} />
          <StyledListSearchBarResultContainer>
            <List>
              {searchTerm !== ''
                ? movies.map((movie) => (
                    <ListItem
                      movie={movie}
                      onClick={() => {
                        handleClick(movie);
                      }}
                      key={movie.id}
                    >
                      {movie.title}
                    </ListItem>
                  ))
                : ''}
            </List>
          </StyledListSearchBarResultContainer>

          <ListContent list={location.state.list.list} />
        </Grid>
        <Grid item xs={3}>
          <h3>Listelerim</h3>
          <Lists />
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

const mapDispatchToProps = (dispatch) => {
  return {
    addToList: (movie, list) => dispatch(addToList(movie, list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
