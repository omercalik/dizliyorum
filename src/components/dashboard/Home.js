import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Grid from './Grid';
import MovieThumb from './MovieThumb';
import HeroImage from './HeroImage';
import NoImage from '../images/no_image.jpg';
import LoadMoreBtn from './LoadMoreBtn';
import Spinner from './Spinner';
import SearchBar from './SearchBar';

import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
} from '../../config/apiConfig';

import { useHomeFetch } from '../hooks/useHomeFetch';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [
    {
      state: { movies, currentPage, totalPages, heroImage, notFound },
      loading,
      error,
    },
    fetchMovies,
  ] = useHomeFetch(searchTerm);

  const searchMovies = async (search) => {
    const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

    await fetchMovies(endpoint);
    setSearchTerm(search);
  };

  const loadMoreMovies = async () => {
    const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${
      currentPage + 1
    }`;
    const popularEndpoint = `${POPULAR_BASE_URL}&page=${currentPage + 1}`;
    const endpoint = searchTerm ? searchEndpoint : popularEndpoint;

    await fetchMovies(endpoint);
  };

  if (error) return <div>Something went wrong..</div>;

  if (!movies[0]) return <Spinner />;

  return (
    <>
      <>
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
          title={heroImage.title}
          text={heroImage.overview}
        />

        <SearchBar callback={searchMovies} />

        <Grid header={searchTerm ? 'Search Result' : ''}>
          {!notFound ? (
            movies.map((movie) => (
              <MovieThumb
                key={movie.id}
                clickable
                image={
                  movie.poster_path
                    ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                    : NoImage
                }
                movie={movie}
                movieName={movie.original_title}
                content={movie}
              />
            ))
          ) : (
            <h1>ARADIĞINIZ FİLM BULUNAMADI</h1>
          )}
        </Grid>

        {loading && <Spinner />}
        {currentPage < totalPages && !loading && (
          <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
        )}
      </>
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
    },
  ]),
  connect(mapStateToProps)
)(Home);
