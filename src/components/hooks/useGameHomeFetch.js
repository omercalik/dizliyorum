import { useState, useEffect, useCallback } from 'react';

export const useGameHomeFetch = (gameSlug) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setError(false);
    setLoading(true);

    try {
      const endpoint = `https://rawg.io/api/games/${gameSlug}`;

      const result = await (await fetch(endpoint)).json();

      setState({
        ...result,
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [gameSlug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return [state, loading, error];
};
