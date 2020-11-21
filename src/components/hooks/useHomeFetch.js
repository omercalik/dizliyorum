import { useState, useEffect } from 'react';
import {
  POPULAR_BASE_URL,
  SEARCH_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
  IMAGE_BASE_URL,
  POPULAR_BASE_URL_TV,
} from '../../config/apiConfig';

export const useHomeFetch = () => {
  const [state, setState] = useState({ movies: [] });
  const [testState, setTestState] = useState({ movies: [{}], tvs: [{}] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dummyFunction = (endpoint1, endpoint2) => {
    Promise.all([fetch(endpoint1), fetch(endpoint2)])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        data[0].results.forEach((movie) => {
          movie.isMovie = 'true';
        });
        data[1].results.forEach((tv) => {
          tv.isTv = 'true';
        });

        const isLoadMoreMovie = endpoint1.search('page');
        const isLoadMoreTv = endpoint2.search('page');
        console.log(data);
        setTestState(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchMovies = async (endpoint) => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search('page');

    try {
      const result = await (await fetch(endpoint)).json();

      setState((prev) => ({
        ...prev,
        movies:
          isLoadMore !== -1
            ? [...prev.movies, ...result.results]
            : [...result.results],

        heroImage: prev.heroImage || result.results[0],
        currentPage: result.page,
        totalPages: result.total_pages,
      }));
    } catch (error) {
      setError(true);
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(POPULAR_BASE_URL);
    dummyFunction(POPULAR_BASE_URL, POPULAR_BASE_URL_TV);
  }, []);

  return [{ state, loading, error, testState }, fetchMovies, dummyFunction];
};
