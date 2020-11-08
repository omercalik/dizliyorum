import React, { Component, useState } from 'react';

import MovieList from '../projects/MovieList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { TopList } from '../profile/Lists/TopList';
import Profile from '../profile/Profile';
import Navbar from '../layout/Navbar';
import SignIn from '../auth/SignIn';

import Grid from './Grid';
import MovieThumb from './MovieThumb';

import {
  API_URL,
  API_KEY,
  API_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
} from '../../config/apiConfig';

import HeroImage from './HeroImage';

import { useHomeFetch } from '../hooks/useHomeFetch';

import NoImage from '../images/no_image.jpg';

const Home = () => {
  const [{ state, loading, error }, fetchMovies] = useHomeFetch();
  const [searchTerm, setSearchTerm] = useState('');
  console.log(state);

  if (error) return <div>Something went wrong..</div>;
  if (!state.movies[0]) return <div>Error</div>;
  return (
    <>
      <HeroImage
        image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
        title={state.heroImage.title}
        text={state.heroImage.overview}
      />

      <Grid header={searchTerm ? 'Search Result ' : 'Popular Movies'}>
        {state.movies.map((movie) => (
          <MovieThumb
            key={movie.id}
            clickable
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage
            }
            movieId={movie.id}
            movieName={movie.title}
          />
        ))}
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
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
)(Home);
