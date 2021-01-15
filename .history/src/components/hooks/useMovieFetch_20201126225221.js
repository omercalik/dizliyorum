import { useState, useEffect, useCallback } from 'react';
import { API_URL, API_KEY } from '../../config/apiConfig';

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=tr`;
      const result = await (await fetch(endpoint)).json();

      const creditsEndPoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=tr`;
      const creditsResult = await (await fetch(creditsEndPoint)).json();
      const directors = creditsResult.crew.filter(
        (member) => member.job === 'Director'
      );
      result.isMovie = true;
      setState({
        ...result,
        actors: creditsResult.cast,
        directors,
        isMovie: true,
      });
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }, [movieId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [state, loading, error];
};
