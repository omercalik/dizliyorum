import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Grid from '../dashboard/Grid';
import TVThumb from './TVThumb';
import HeroImage from '../dashboard/HeroImage';
import NoImage from '../images/no_image.jpg';
import LoadMoreBtn from '../dashboard/LoadMoreBtn';
import Spinner from '../dashboard/Spinner';
import SearchBar from '../dashboard/SearchBar';

import {
  SEARCH_BASE_URL_TV,
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  POPULAR_BASE_URL_TV,
} from '../../config/apiConfig';

import { useTVMainFetch } from '../hooks/useTVMainFetch';

const TV = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [
    {
      state: { tvs, currentPage, totalPages, heroImage },
      loading,
      error,
    },
    fetchTVs,
  ] = useTVMainFetch(searchTerm);

  const searchTVs = (search) => {
    const endpoint = search ? SEARCH_BASE_URL_TV + search : POPULAR_BASE_URL_TV;

    setSearchTerm(search);

    fetchTVs(endpoint);
  };

  const loadMoreMovies = () => {
    const searchEndpoint = `${SEARCH_BASE_URL_TV}${searchTerm}&page=${
      currentPage + 1
    }`;

    const popularEndpoint = `${POPULAR_BASE_URL_TV}&page=${currentPage + 1}`;
    const endpoint = searchTerm ? searchEndpoint : popularEndpoint;

    fetchTVs(endpoint);
  };

  if (error) return <div>Something went wrong..</div>;
  if (!tvs[0]) return <Spinner />;

  return (
    <>
      {heroImage !== undefined ? (
        <>
          {!searchTerm && (
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
              title={heroImage.name}
              text={heroImage.overview}
            />
          )}
          <SearchBar callback={searchTVs} />
          <Grid header={searchTerm ? 'Search Result' : 'Popular TV Series'}>
            {tvs.map((TV) => (
              <TVThumb
                key={TV.id}
                clickable
                image={
                  TV.poster_path
                    ? IMAGE_BASE_URL + POSTER_SIZE + TV.poster_path
                    : NoImage
                }
                TVId={TV.id}
                TVName={TV.name}
                content={TV}
              />
            ))}
          </Grid>
          {loading && <Spinner />}
          {currentPage < totalPages && !loading && (
            <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
          )}
        </>
      ) : (
        <Spinner />
      )}
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
)(TV);
