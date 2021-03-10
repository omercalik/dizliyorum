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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (endpoint) => {
    setError(false);
    setLoading(true);

    const isLoadMore = endpoint.search('page');

    try {
      const result = await (await fetch(endpoint)).json();

      if (result.results.length === 0) {
        setState((prev) => ({
          ...prev,
          movies: [{}],
          heroImage: prev.heroImage || result.results[0],
          currentPage: result.page,
          totalPages: result.total_pages,
          notFound: true,
        }));
        setLoading(false);
      } else {
        result.results.forEach((movie) => {
          movie.isMovie = true;
        });
        setState((prev) => ({
          ...prev,
          movies:
            isLoadMore !== -1
              ? [...prev.movies, ...result.results]
              : [...result.results],

          heroImage: prev.heroImage || result.results[0],
          currentPage: result.page,
          totalPages: result.total_pages,
          notFound: false,
          isMovie: true,
        }));
        setLoading(false);
      }
      console.log(state);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(POPULAR_BASE_URL);
  }, []);

  return [{ state, loading, error }, fetchMovies];
};
