import { useState, useEffect, useCallback } from 'react';
import { API_URL, API_KEY } from '../../config/apiConfig';

export const useTVFetch = (TVId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const endpoint = `${API_URL}tv/${TVId}?api_key=${API_KEY}&language=tr`;
      const result = await (await fetch(endpoint)).json();

      const creditsEndPoint = `${API_URL}tv/${TVId}/credits?api_key=${API_KEY}&language=en-US`;
      const creditsResult = await (await fetch(creditsEndPoint)).json();

      const directors = creditsResult.crew.filter(
        (member) => member.known_for_department === 'Directing'
      );
      result.isTV = true;
      setState({
        ...result,
        actors: creditsResult.cast,
        directors,
        isTV: true,
      });
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }, [TVId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [state, loading, error];
};
